
import UserApi from "@/app/api/UserApi"
import { Button } from "@/components/ui/button"
import DataTable from "./_component/dataTable"




export default async function UsersPage() {

  const users = JSON.parse(JSON.stringify((await UserApi.getAll())))

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
              <Button className="mt-4">Add User</Button>
            </div>
            :
            <DataTable data={users}/>
        }

      </div>
    </>

  )
}
