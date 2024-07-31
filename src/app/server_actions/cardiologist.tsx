"use server"
import prisma from "@/app/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import {cardiologists as Cardiologist} from "@prisma/client"

const model = prisma.cardiologists

function props(){
    let obj: Cardiologist = {
        id: 0,
        doctor_id: 0,
        full_name: "",
        email: "",
        password: "",
        salt: "",
        phone_num: null,
        bank_num: null,
        verified: false,
        activation_token: "",
        activation_token_expired_at: new Date(),
        password_reset_token: null,
        password_reset_token_expired_at: null,
        created_at: new Date(),
        modified_at: null
    }
    return Object.keys(obj)   
}

export async function changePassword(id: number, body: any): Promise<Cardiologist> {    

    let newSalt = cryptoUtil.generateSalt();
    let newProcessedPassword = cryptoUtil.hashPasswordWithSalt(body.password, newSalt);

    console.log(newSalt)
    console.log(newProcessedPassword)

    return await model.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteCardiologist(id:number) : Promise<Cardiologist>  {
    return await model.delete({where:{id}})
}

export async function updateCardiologist(id:number, body:any) : Promise<Cardiologist>  {
    
    body.birth_date = body.birth_date ? new Date(body.birth_date) : undefined
    
    delete body.password
    delete body.salt

    return await model.update({
        data:{...body}, 
        where:{id}
    })
}

export async function createCardiologist(body:any) : Promise<Cardiologist>  {

    generalUtil.removeUnknownProps(body, props())
    
    let salt = cryptoUtil.generateSalt()
    
    const cardiologist: Cardiologist = {
        ...body,
        birth_date: body.birth_date ? new Date(body.birth_date) : undefined,
        salt: salt,
        password: cryptoUtil.hashPasswordWithSalt(body.password, salt),
        activation_token: cryptoUtil.generateRandomString(16),
        activation_token_expired_at: generalUtil.nowPlusDay(1),
        created_at: new Date()
    }
    
    
    return await model.create({
        data:{...cardiologist}
    })
}