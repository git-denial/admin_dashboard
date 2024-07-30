import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      
      <Skeleton className="h-[400px] w-[500px] rounded-xl m-auto flex items-center justify-center" >Loading</Skeleton>
      
      )
  }