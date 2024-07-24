import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"

async function getAll() : Promise<User[]>  {
    return await prisma.users.findMany()
}

async function getById(id:number) : Promise<User|null>  {
    return await prisma.users.findUnique({where:{id}})
}

export default{
    getAll,
    getById
}