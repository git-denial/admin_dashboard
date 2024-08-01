import { Skeleton } from "@/components/ui/skeleton"

/*
TODO: Cause too much rerender in dataTable.tsx. Apparently, had some conflict with actions column cells of the data table

Adding these 2 options to useReactTable constructor fixes the issue as well
// autoResetPageIndex: false,
// autoResetExpanded: false,

*/
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