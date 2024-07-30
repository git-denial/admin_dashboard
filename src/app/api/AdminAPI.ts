import prisma from "@/app/lib/prisma";
import {administrators as Admin} from "@prisma/client"

const model = prisma.administrators

async function getAll() : Promise<Admin[]>  {
    return await model.findMany()
}

async function getById(id:number) : Promise<Admin|null>  {
    return await model.findUnique({where:{id}})
}

async function getByUsername(username:string) : Promise<Admin|null>  {
    return await model.findUnique({where:{username}})
}

export default{
    getAll,
    getById,
    getByUsername
}