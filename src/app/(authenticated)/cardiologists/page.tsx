
import CardiologistApi from "@/app/api/CardiologistAPI"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/dataTable"
import { CardiologistDataTableColumns } from "./dataTableColumn"
import Link from "next/link"




export default async function UsersPage() {

  let cardiologists = JSON.parse(JSON.stringify((await CardiologistApi.getAll())))
  //process nullish value to empty string so that it can be search globally within the datatable
  cardiologists  = cardiologists.map((u:any)=> {
    for(let o of Object.keys(u)) if(u[o] == null) u[o] = ''
    return u
  })
  

  return (
    <>
      <div className="flex items-center">

        <h1 className="text-lg font-semibold md:text-2xl">Cardiologists</h1>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">

        {
          cardiologists.length === 0 ?
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no cardiologists
              </h3>
              <p className="text-sm text-muted-foreground">
                Table of cardiologists will appear once there is a cardiologist
              </p>
              <Link href="/users/create"><Button className="mt-4">Create Cardiologist</Button></Link>
            </div>
            :
            <DataTable data={cardiologists} columns={CardiologistDataTableColumns} createPageHref={'/cardiologists/create'}/>
        }

      </div>
    </>

  )
}
