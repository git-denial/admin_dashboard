import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
    <div className="flex items-center">

            <h1 className="text-lg font-semibold md:text-2xl">Create User</h1>
            </div>
          
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
            <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create user</CardTitle>
        
      </CardHeader>
      <CardContent>
      <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
        
      </CardContent>
    </Card>
            </div>
          </div>
    </>

    )
}