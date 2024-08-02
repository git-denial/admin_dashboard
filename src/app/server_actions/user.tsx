"use server"
import { AuthError, authRole } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import prisma from "@/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import {users as User} from "@prisma/client"
import { cookies } from "next/headers";

const model = prisma.users

function props(){
    let obj: User = {
        id: 0,
        full_name: "",
        email: "",
        password: "",
        salt: "",
        birth_date: null,
        weight: null,
        height: null,
        phone_num: null,
        created_at: new Date(),
        modified_at: null
    }
    return Object.keys(obj)   
}

export async function changePassword(id: number, body: any): Promise<User> {

    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    let newSalt = cryptoUtil.generateSalt();
    let newProcessedPassword = cryptoUtil.hashPasswordWithSalt(body.password, newSalt);

    return await model.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteUser(id:number) : Promise<User>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
        
    return await model.delete({where:{id}})
}

export async function updateUser(id:number, body:any) : Promise<User>  {

    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
    
    body.birth_date = body.birth_date ? new Date(body.birth_date) : undefined
    
    delete body.password
    delete body.salt

    return await model.update({
        data:{...body}, 
        where:{id}
    })
}

export async function createUser(body:any) : Promise<User>  {

    generalUtil.removeUnknownProps(body, props())
    
    let salt = cryptoUtil.generateSalt()
    
    const user: User = {
        ...body,
        birth_date: body.birth_date ? new Date(body.birth_date) : undefined,
        salt: salt,
        password: cryptoUtil.hashPasswordWithSalt(body.password, salt),
        activation_token: cryptoUtil.generateRandomString(16),
        activation_token_expired_at: generalUtil.nowPlusDay(1),
        created_at: new Date()
    }
    
    
    return await model.create({
        data:{...user}
    })
}