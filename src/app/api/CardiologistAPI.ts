import { authRole, AuthError } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import {cardiologists as Cardiologist} from "@prisma/client"
import { cookies } from "next/headers";

const model = db.cardiologists

async function getAll() : Promise<Cardiologist[]>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
        
    return await model.findMany()
}

async function getById(id:number) : Promise<Cardiologist|null>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findUnique({where:{id}})
}

async function getByEmail(email:string) : Promise<Cardiologist|null>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findUnique({where:{email}})
}

export default{
    getAll,
    getById,
    getByEmail
}