"use server"
import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"
import crypto from 'crypto'

function generateSalt() {
    return crypto.randomBytes(20).toString('hex')
}

function hashSHA1(str: string) {
    return crypto.createHash('sha1').update(str).digest('hex')
}

function nowPlusDay(n: number) {

    let now = new Date()
    return new Date(now.setDate(now.getDate() + n))

}

function clean(obj: any){
    let propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
}

const model = prisma.users

function UserProps(){
    let obj: User = {
        id: 0,
        full_name: "",
        email: "",
        password: "",
        salt: "",
        birth_date: null,
        weight: null,
        height: null,
        phone_num: null,
        emergency_phone_num: null,
        activation_token: "",
        activation_token_expired_at: new Date(),
        password_reset_token: null,
        password_reset_token_expired_at: null,
        verified: false,
        created_at: new Date(),
        modified_at: null
    }
    return Object.keys(obj)   
}

function removeUnknownProps(x:any){
    const userprop = UserProps()
    const xprop = Object.keys(x)

    for(let xp of xprop) if(!userprop.includes(xp)) delete x[xp]
}

export async function changePassword(id: number, body: any): Promise<User> {

    console.log(body)

    let newSalt = generateSalt();
    let newProcessedPassword = hashSHA1(body.password + newSalt);

    console.log(newSalt)
    console.log(newProcessedPassword)

    return await model.update({
        data: { password: newProcessedPassword, salt: newSalt},
        where: { id }
    })
}

export async function deleteUser(id:number) : Promise<User>  {
    return await model.delete({where:{id}})
}

export async function updateUser(id:number, body:any) : Promise<User>  {
    
    body.birth_date = body.birth_date ? new Date(body.birth_date) : undefined
    
    delete body.password
    delete body.salt

    return await model.update({
        data:{...body}, 
        where:{id}
    })
}

export async function createUser(body:any) : Promise<User>  {

    removeUnknownProps(body)
    
    let salt = generateSalt()
    
    const user: User = {
        ...body,
        birth_date: body.birth_date ? new Date(body.birth_date) : undefined,
        salt: salt,
        password: hashSHA1(body.password + salt),
        activation_token: crypto.randomBytes(16).toString('base64'),
        activation_token_expired_at: nowPlusDay(1),
        created_at: new Date()
    }
    
    
    return await model.create({
        data:{...user}
    })
}