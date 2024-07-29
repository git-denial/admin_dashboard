
import UserApi from "@/app/api/UserApi"
import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/dataTable"
import { UserDataTableColumns } from "./dataTableColumn"
import Link from "next/link"




export default async function UsersPage() {

  let users = JSON.parse(JSON.stringify((await UserApi.getAll())))
  //process nullish value to empty string so that it can be search globally within the datatable
  users  = users.map((u:any)=> {
    for(let o of Object.keys(u)) if(u[o] == null) u[o] = ''
    return u
  })
  

  return (
    <>
      <div className="flex items-center">

        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">

        {
          users.length === 0 ?
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no users
              </h3>
              <p className="text-sm text-muted-foreground">
                Table of users will appear once there is a user
              </p>
              <Link href="/users/create"><Button className="mt-4">Create User</Button></Link>
            </div>
            :
            <DataTable data={users} columns={UserDataTableColumns} createPageHref={'/users/create'}/>
        }

      </div>
    </>

  )
}
