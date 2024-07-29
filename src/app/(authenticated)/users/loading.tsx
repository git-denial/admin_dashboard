import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
      <div className="flex items-center">

        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">

      
      <Skeleton className="h-[650px] w-[1500px] rounded-xl flex items-center justify-center" >Loading</Skeleton>
      

      </div>
    </>
      )
  }