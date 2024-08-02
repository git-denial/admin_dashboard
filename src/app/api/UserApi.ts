import { AuthError, authRole, generateJWToken } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import { users as User } from "@prisma/client"
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const model = db.users

async function getAll(): Promise<User[]> {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
        
    return await model.findMany()
}

async function getById(id: number): Promise<User | null> {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findUnique({ where: { id } })
}

async function getByEmail(email: string): Promise<User | null> {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findUnique({ where: { email } })
}

async function login(email: string, pass: string) {
    let user = await model.findUnique({ where: { email } })

    if (!user) throw new AuthError('Incorrect credentials')

    let hashPass = cryptoUtil.hashPasswordWithSalt(pass, user.salt)

    if (hashPass !== user?.password) throw new AuthError('Incorrect credentials')
        
    generalUtil.removeSensitiveDataFromObj(user)

    let response:any = NextResponse.json(
        { success: true },
        { status: 200, headers: { "content-type": "application/json" } }
    );

    cookies().set(AUTH_TOKEN, await generateJWToken({...user, type:'USER'}), {secure:true, httpOnly:true, maxAge: generalUtil.timeUnitInSeconds(1, 'hour')})


    return response;
}


export default {
    getAll,
    getById,
    getByEmail,
    login
}