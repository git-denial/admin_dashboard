
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function Dashboard() {
  redirect('/users')
  return (
    <>
    <div className="flex items-center">

            <h1 className="text-lg font-semibold md:text-2xl">Home</h1>
            </div>
    </>
 
  )
}
