
import { Button } from "@/components/ui/button"

export default function UsersPage() {
  return (
    <>
    <div className="flex items-center">

            <h1 className="text-lg font-semibold md:text-2xl">Admins</h1>
            </div>
          
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no admins
              </h3>
              <p className="text-sm text-muted-foreground">
                Table of admins will appear once there is a user
              </p>
              <Button className="mt-4">Add Admin</Button>
            </div>
          </div>
    </>
 
  )
}
