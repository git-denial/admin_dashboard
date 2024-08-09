
import ConsultationApi from "@/app/api/ConsultationAPI"
import DataTable from "@/components/ui/dataTable"
import { ConsultationsDataTableColumns } from "./dataTableColumn"
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Consultations",
  description: "Consultations",
};


export default async function ConsultationsPage() {

  let consultations = JSON.parse(JSON.stringify((await ConsultationApi.getAll())))
  //process nullish value to empty string so that it can be search globally within the datatable
  consultations  = consultations.map((u:any)=> {
    for(let o of Object.keys(u)) if(u[o] == null) u[o] = ''
    u.user_name = u.users.full_name
    u.cardiologist_name = u.cardiologists.full_name
    return u
  })
  

  return (
    <>
      <div className="flex items-center">

        <h1 className="text-lg font-semibold md:text-2xl">Consultations</h1>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">

        {
          consultations.length === 0 ?
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                There are no consultations
              </h3>
              <p className="text-sm text-muted-foreground">
                Table of consultations will appear once there is a consultation
              </p>
              {/* <Link href="/users/create"><Button className="mt-4">Create Consultation</Button></Link> */}
            </div>
            :
            <DataTable data={consultations} columns={ConsultationsDataTableColumns}/>
        }

      </div>
    </>

  )
}
