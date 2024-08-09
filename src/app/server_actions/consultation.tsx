"use server"
import { authRole, AuthError } from "@/lib/auth";
import { AUTH_TOKEN } from "@/lib/constants";
import { db } from "@/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import {consultations as Consultation} from "@prisma/client"
import { cookies } from "next/headers";

const model = db.consultations

function props(){
    let obj: Consultation = {
        id: 0,
        user_id: 0,
        cardiologist_id: 0,
        status: "PENDING",
        payment: 0 as any,
        start_at: new Date(),
        end_at: null,
        created_at: new Date(),
        modified_at: null
    }
    return Object.keys(obj)   
}

export async function deleteConsultation(id:number) : Promise<Consultation>  {
    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")

    return await model.delete({where:{id}})
}

export async function updateConsultation(id:number, body:any) : Promise<Consultation>  {

    let token = cookies().get(AUTH_TOKEN)?.value + ''
    if(!authRole(token, "ADMIN")) throw new AuthError("Unauthorized access")
    
    body.end_at = body.end_at ? new Date(body.end_at) : undefined

    return await model.update({
        data:{...body, modified_at:new Date()}, 
        where:{id},
    })
}

export async function createConsultation(body:any) : Promise<Consultation>  {
    
    generalUtil.removeUnknownProps(body, props())
    
    const consultation: Consultation = {
        ...body,
        end_at: body.end_at ? new Date(body.end_at) : undefined,
        created_at: new Date()
    }
    
    
    return await model.create({
        data:{...consultation}
    })
}