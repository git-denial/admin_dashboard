"use server"
import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"

export async function updateUser(id:number, body:any) : Promise<User>  {
    return await prisma.users.update({...body, where:id})
}