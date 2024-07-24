"use server"
import prisma from "@/app/lib/prisma";
import {cardiologists as Cardiologist} from "@prisma/client"
import crypto from 'crypto'

function generateSalt() {
    return crypto.randomBytes(20).toString('hex')
}

function hashSHA1(str: string) {
    return crypto.createHash('sha1').update(str).digest('hex')
}

const model = prisma.cardiologists

export async function changePassword(id: number, body: any): Promise<Cardiologist> {

    console.log(body)

    let newSalt = generateSalt();
    let newProcessedPassword = hashSHA1(body.password + newSalt);

    console.log(newSalt)
    console.log(newProcessedPassword)

    return await model.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteUser(id:number) : Promise<Cardiologist>  {
    return await model.delete({where:{id}})
}

export async function updateUser(id:number, body:any) : Promise<Cardiologist>  {
    
    body.birth_date = body.birth_date ? new Date(body.birth_date) : undefined
    body.password = undefined
    body.salt = undefined

    return await model.update({
        data:{...body}, 
        where:{id}
    })
}