"use server"

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"
import CardiologistApi from "@/app/api/CardiologistAPI"
import ChangePasswordDialog from "./changePasswordDialog"
import EditDialog from "./EditDialog"
import { DeleteDialog } from "./deleteDialog"
import { redirect } from "next/navigation"


export default async function CardiologistDetail({params}: {params:{id:string}}) {

  let id = parseInt(params.id)

  if(isNaN(id)) redirect('/cardiologists')

  const cardiologDetail = JSON.parse(JSON.stringify(await CardiologistApi.getById(id)))
  
  
  if(cardiologDetail)
  return (
    <Card className="overflow-hidden w-1/3 m-auto">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            ID {params.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Created: {new Date(cardiologDetail.created_at).toDateString()}</CardDescription>
          <CardDescription>Last modified: {new Date(cardiologDetail.modified_at).toDateString()}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Something
            </span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10" align="end">
            <EditDialog
            child={<Button className="w-full text-[12px] border-primary" variant={'ghost'}>Edit</Button>}
            cardiolog={cardiologDetail}
            />
            <ChangePasswordDialog 
            child={<Button className="w-full text-[12px] border-primary" variant={'ghost'}>Change password</Button>}
            cardiologist={cardiologDetail}
            />
            <DeleteDialog
            child={<Button className="w-full text-[12px] border-primary hover:bg-destructive hover:text-white" variant={'ghost'}>Delete</Button>}
            text={{head:"Are you sure?", body:"You are about to delete this user"}}
            id={cardiologDetail.id}            
            />
            
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Full Name
              </span>
              <span>{cardiologDetail.full_name}</span>
            </li>
          </ul>
        <Separator className="my-2" />
        <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone Number</span>
              <span>{ cardiologDetail.phone_num == null ? '-' : cardiologDetail.phone_num+''}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{cardiologDetail.email}</span>
            </li>
          </ul>
        </div>
        
      </CardContent>
      {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter> */}
    </Card>    
  )  
}
