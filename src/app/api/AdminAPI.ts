import { AuthError, authRole, decodeJWTToken, generateJWToken } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import {administrators as Admin} from "@prisma/client"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const model = db.administrators

async function getAll() : Promise<Admin[]>  {
    
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    let admins = await model.findMany()

    for(let a of admins) generalUtil.removeSensitiveDataFromObj(a)

    return admins
}

async function getById(id:number) : Promise<Admin|null>  {

    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    let admin = await model.findUnique({where:{id}})

    generalUtil.removeSensitiveDataFromObj(admin)

    return admin
}

async function getByUsername(username:string) : Promise<Admin|null>  {

    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    let admin = await model.findUnique({where:{username}})

    generalUtil.removeSensitiveDataFromObj(admin)

    return admin
}

async function getByIdFromJWToken(token:string) : Promise<Admin|null>  {

    let decoded = await decodeJWTToken(token)    

    if(!decoded) return null
        
    let id = parseInt(decoded.id+'')

    if(isNaN(id)) return null

    let admin = await model.findUnique({where:{id}})

    generalUtil.removeSensitiveDataFromObj(admin)

    return admin
}

async function login(username: string, pass: string) {
    let user = await model.findUnique({ where: { username } })

    if (!user) throw new AuthError('Incorrect credentials')

    let hashPass = cryptoUtil.hashPasswordWithSalt(pass, user.salt)

    if (hashPass !== user?.password) throw new AuthError('Incorrect credentials')
        
    generalUtil.removeSensitiveDataFromObj(user)

    let response:any = NextResponse.json(
        { success: true },
        { status: 200, headers: { "content-type": "application/json" } }
    );

    cookies().set(AUTH_TOKEN, await generateJWToken({...user, type:'ADMIN'}), {secure:true, httpOnly:true, maxAge: generalUtil.timeUnitInSeconds(1, 'hour')})


    return response;
}

export default{
    getAll,
    getById,
    getByUsername,
    getByIdFromJWToken,
    login
}