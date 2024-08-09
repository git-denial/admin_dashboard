import { authRole, AuthError } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import {consultations as Consultation} from "@prisma/client"
import { cookies } from "next/headers";

const model = db.consultations

async function getAll() : Promise<Consultation[]>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
        
    return await model.findMany()
}

async function getById(id:number) : Promise<Consultation|null>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findUnique({where:{id}})
}

export default{
    getAll,
    getById
}