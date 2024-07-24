import prisma from "@/app/lib/prisma";
import {administrators as Admin} from "@prisma/client"

async function getAll() : Promise<Admin[]>  {
    return await prisma.administrators.findMany()
}

async function getById(id:number) : Promise<Admin|null>  {
    return await prisma.administrators.findUnique({where:{id}})
}

export default{
    getAll,
    getById
}