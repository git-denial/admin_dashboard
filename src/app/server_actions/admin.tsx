"use server"
import prisma from "@/lib/prisma";
import cryptoUtil from "@/utils/cryptoUtil";
import generalUtil from "@/utils/generalUtil";
import {administrators as Admin} from "@prisma/client"

const model = prisma.administrators

function props(){
    let obj: Admin = {
        id: 0,
        username: "",
        password: "",
        salt: "",
        created_at: new Date(),
        modified_at: null
    }
    return Object.keys(obj)   
}

export async function changePassword(id: number, password: string): Promise<Admin> {    

    let newSalt = cryptoUtil.generateSalt();
    let newProcessedPassword = cryptoUtil.hashPasswordWithSalt(password, newSalt);

    return await model.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteAdmin(id:number) : Promise<Admin>  {
    return await model.delete({where:{id}})
}

export async function updateAdmin(id:number, body:any) : Promise<Admin>  {
    
    delete body.username
    delete body.password
    delete body.salt

    return await model.update({
        data:{...body}, 
        where:{id}
    })
}

export async function changeUsername(id:number, username:string){
    
    
    if((await model.findUnique({where:{username}}))?.id) throw Error("Username already exist")  
    

    return await model.update({
        data:{username}, 
        where:{id}
    })
}

export async function createAdmin(body:any) : Promise<Admin>  {

    generalUtil.removeUnknownProps(body, props())
    
    let salt = cryptoUtil.generateSalt()
    
    const admin: Admin = {
        ...body,
        birth_date: body.birth_date ? new Date(body.birth_date) : undefined,
        salt: salt,
        password: cryptoUtil.hashPasswordWithSalt(body.password, salt),
        activation_token: cryptoUtil.generateRandomString(16),
        activation_token_expired_at: generalUtil.nowPlusDay(1),
        created_at: new Date()
    }
    
    
    return await model.create({
        data:{...admin}
    })
}