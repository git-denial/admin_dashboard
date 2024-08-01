import type { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { AUTH_TOKEN, JWT_SECRET_KEY } from './constants'
import { cookies } from 'next/headers'

interface UserJwtPayload {
  jti: string
  iat: number
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  console.log(cookies())
  console.log(AUTH_TOKEN)
  console.log(req.cookies.get(AUTH_TOKEN))
  const token = req.cookies.get(AUTH_TOKEN)?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token,new TextEncoder().encode(JWT_SECRET_KEY))
    
    return verified.payload as UserJwtPayload

  } catch (err) {
    throw new AuthError('Your token has expired.')
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