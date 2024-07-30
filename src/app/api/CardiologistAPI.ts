import prisma from "@/app/lib/prisma";
import {cardiologists as Cardiologist} from "@prisma/client"

const model = prisma.cardiologists

async function getAll() : Promise<Cardiologist[]>  {
    return await model.findMany()
}

async function getById(id:number) : Promise<Cardiologist|null>  {
    return await model.findUnique({where:{id}})
}

async function getByEmail(email:string) : Promise<Cardiologist|null>  {
    return await model.findUnique({where:{email}})
}

export default{
    getAll,
    getById,
    getByEmail
}