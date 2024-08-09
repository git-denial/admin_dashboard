"use server"

import {
  Card,
} from "@/components/ui/card"

import { redirect } from "next/navigation"
import ChatBox from "./chatBox"
import ChatAPI from "@/app/api/ChatAPI"
import ConsultationAPI from "@/app/api/ConsultationAPI"
import ChatBox2 from "./chatBox2"


export default async function ConsultationsDetail({params}: {params:{id:string}}) {

  let id = parseInt(params.id)

  if(isNaN(id)) redirect('/consultations')

  const detail = JSON.parse(JSON.stringify(await ConsultationAPI.getById(id)))
  const chatDetail = JSON.parse(JSON.stringify(await ChatAPI.getByConsultationId(id)))
  
  
  if(chatDetail)
  return (
    <Card className="overflow-hidden w-1/3 m-auto">
      <title>Consultation detail</title>
      <ChatBox2 user={detail.users} cardiologist={detail.cardiologists} messages={[...chatDetail, ...chatDetail, ...chatDetail]} />
      
    </Card>    
  )  
}
