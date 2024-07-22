import { NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import {users as User} from "@prisma/client"

async function getAll() : Promise<User[]>  {
    return await prisma.users.findMany()
}

async function delete_(id:any) : Promise<boolean>  {
    return !!(await prisma.users.delete({where:id}))
}

export default{
    getAll,
    delete_
}