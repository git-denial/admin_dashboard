"use server"
import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"

export async function deleteUser(id:number) : Promise<User>  {
    return await prisma.users.delete({where:{id}})
}