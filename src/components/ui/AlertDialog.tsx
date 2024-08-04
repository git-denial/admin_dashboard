import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dispatch, SetStateAction, useState } from "react"
import SpinnerLoading from "./spinnerloading"

export default function AlertDialogue({opened, onOpenChange, headMsg, bodyMsg, continueFunction}: {opened:boolean, onOpenChange:Dispatch<SetStateAction<boolean>>, headMsg: string, bodyMsg: string, continueFunction:VoidFunction}) {

  const [loading, setLoading] = useState(false)

  return (
    
    <AlertDialog open={loading? true : opened} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{headMsg}</AlertDialogTitle>
          <AlertDialogDescription>
            {bodyMsg}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          
          <AlertDialogAction disabled={loading} onClick={async ()=>{
            setLoading(true)
            // await new Promise(resolve => setTimeout(resolve, 5000))
            await continueFunction()
            setLoading(false)
          }}>
            {loading? <SpinnerLoading/> : null}  Continue</AlertDialogAction>
            
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
  )
}
