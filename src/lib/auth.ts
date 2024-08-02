import type { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { AUTH_TOKEN, JWT_SECRET_KEY } from './constants'
import { cookies } from 'next/headers'

interface UserJwtPayload {
  jti: string
  iat: number
  type: 'USER'|'CARDIOLOGIST'|'ADMIN'
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {

  const token = req.cookies.get(AUTH_TOKEN)?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token,new TextEncoder().encode(JWT_SECRET_KEY))
    
    return verified.payload as unknown as UserJwtPayload

  } catch (err) {
    console.log(err)
    return null
  }
}

export async function generateJWToken(data:any) {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(JWT_SECRET_KEY))
}

export async function decodeJWTToken(token:string){
  
  try {
    const verified = await jwtVerify(token,new TextEncoder().encode(JWT_SECRET_KEY))
    return verified.payload  as unknown as UserJwtPayload

  } catch (error) {
    console.log(error)
    return null
  }
  
}

export async function authRole(JWToken:string, role:string){
    let token = JWToken

    let decoded = await decodeJWTToken(token)    

    if(!decoded) return false
    if(decoded.type !== role) return false

    return true
}