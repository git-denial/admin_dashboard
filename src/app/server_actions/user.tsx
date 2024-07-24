"use server"
import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"
import crypto from 'crypto'

function generateSalt() {
    return crypto.randomBytes(20).toString('hex')
}

function hashSHA1(str: string) {
    return crypto.createHash('sha1').update(str).digest('hex')
}

export async function changePassword(id: number, body: any): Promise<User> {

    console.log(body)

    let newSalt = generateSalt();
    let newProcessedPassword = hashSHA1(body.password + newSalt);

    console.log(newSalt)
    console.log(newProcessedPassword)

    return await prisma.users.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteUser(id:number) : Promise<User>  {
    return await prisma.users.delete({where:{id}})
}

export async function updateUser(id:number, body:any) : Promise<User>  {
    
    body.birth_date = body.birth_date ? new Date(body.birth_date) : undefined
    body.password = undefined
    body.salt = undefined

    return await prisma.users.update({
        data:{...body}, 
        where:{id}
    })
}