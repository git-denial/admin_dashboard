"use server"
import { authRole, AuthError } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import prisma from "@/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import {cardiologists as Cardiologist} from "@prisma/client"
import { cookies } from "next/headers";

const model = prisma.cardiologists

function props(){
    let obj: Cardiologist = {
        id: 0,
        full_name: "",
        email: "",
        password: "",
        salt: "",
        phone_num: null,
        created_at: new Date(),
        modified_at: null
    }
    return Object.keys(obj)   
}

export async function changePassword(id: number, body: any): Promise<Cardiologist> {
    
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    let newSalt = cryptoUtil.generateSalt();
    let newProcessedPassword = cryptoUtil.hashPasswordWithSalt(body.password, newSalt);

    return await model.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteCardiologist(id:number) : Promise<Cardiologist>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.delete({where:{id}})
}

export async function updateCardiologist(id:number, body:any) : Promise<Cardiologist>  {

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

export async function createCardiologist(body:any) : Promise<Cardiologist>  {
    
    generalUtil.removeUnknownProps(body, props())
    
    let salt = cryptoUtil.generateSalt()
    
    const cardiologist: Cardiologist = {
        ...body,
        birth_date: body.birth_date ? new Date(body.birth_date) : undefined,
        salt: salt,
        password: cryptoUtil.hashPasswordWithSalt(body.password, salt),
        activation_token: cryptoUtil.generateRandomString(16),
        activation_token_expired_at: generalUtil.nowPlusDay(1),
        created_at: new Date()
    }
    
    
    return await model.create({
        data:{...cardiologist}
    })
}