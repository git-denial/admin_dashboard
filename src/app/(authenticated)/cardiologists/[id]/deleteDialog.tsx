"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import SpinnerLoading from "@/components/ui/spinnerloading"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { deleteCardiologist } from "@/app/server_actions/cardiologist"
  
  export function DeleteDialog({child, text, id}: {child:React.ReactNode, text:{head:string, body:string}, id:number}) {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {child}
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-destructive border-black">
          <AlertDialogHeader>
            <AlertDialogTitle>{text.head}</AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              {text.body}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-black hover:text-destructive hover:bg-black" onClick={async()=> {
                try {
                    setLoading(true)
                    await deleteCardiologist(id)   
                    setLoading(false)
                    toast({title: "Cardiologist deleted successfully"})

                    router.push('/cardiologists')
                    router.refresh()
                } catch (error) {

                    setLoading(false)
                    toast({variant: "destructive",title: "Uh oh! Something went wrong.",description: String(error)})
                }
            }}>
                {loading? <SpinnerLoading/> : null}  Delete
                </AlertDialogAction>
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  