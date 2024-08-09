"use server"




import {
  Card,
} from "@/components/ui/card"



import ConsultationApi from "@/app/api/ConsultationAPI"
import { redirect } from "next/navigation"


export default async function ConsultationsDetail({params}: {params:{id:string}}) {

  let id = parseInt(params.id)

  if(isNaN(id)) redirect('/consultations')

  const consulDetail = JSON.parse(JSON.stringify(await ConsultationApi.getById(id)))
  
  
  if(consulDetail)
  return (
    <Card className="overflow-hidden w-1/3 m-auto">
      <title>Consultation detail</title>
      
    </Card>    
  )  
}
