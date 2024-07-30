import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"

const model = prisma.users

async function getAll() : Promise<User[]>  {
    return await model.findMany()
}

async function getById(id:number) : Promise<User|null>  {
    return await model.findUnique({where:{id}})
}

async function getByEmail(email:string) : Promise<User|null>  {
    return await model.findUnique({where:{email}})
}


export default{
    getAll,
    getById,
    getByEmail
}