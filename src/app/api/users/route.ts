import prisma from "@/app/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest, context: { params: Params }) {
    
    return await prisma.users.findMany()
}