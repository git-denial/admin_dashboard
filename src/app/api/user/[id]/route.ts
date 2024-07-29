import prisma from "@/app/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function DELETE(request:NextRequest, context: { params: Params }) {
    
    let id = parseInt(context.params.id)
    let result = await prisma.users.delete({where: {id:id}})

    return Response.json(result)

  }