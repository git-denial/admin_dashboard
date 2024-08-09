import { authRole, AuthError } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import {chat as Chat} from "@prisma/client"
import { cookies } from "next/headers";

const model = db.chat

async function getAll() {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
        
    return await model.findMany()
}

async function getById(id:number) : Promise<Chat|null>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findUnique({where:{id}})
}

async function getByConsultationId(consultation_id:number) : Promise<Chat[]>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.findMany({where:{consultation_id}})
}

export default{
    getAll,
    getById,
    getByConsultationId
}