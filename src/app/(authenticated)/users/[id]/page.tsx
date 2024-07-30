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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import UserApi from "@/app/api/UserApi"
import { users as User } from "@prisma/client"
import ChangePasswordDialog from "./changePasswordDialog"
import EditDialog from "./EditDialog"
import { DeleteUserDialog } from "./deleteUserDialog"

export default async function UserDetail({params}: {params:{id:string}}) {

  
  const userDetail = JSON.parse(JSON.stringify(await UserApi.getById(parseInt(params.id))))
  
  
  if(userDetail)
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
          <CardDescription>Created: {new Date(userDetail.created_at).toDateString()}</CardDescription>
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
            child={<Button className="w-full bg-transparent text-black text-[12px] border-primary hover:bg-transparent/5">Edit</Button>}
            user={userDetail}
            />
            <ChangePasswordDialog 
            child={<Button className="w-full bg-transparent text-black text-[12px] border-primary hover:bg-transparent/5">Change password</Button>}
            user={userDetail}
            />
            <DeleteUserDialog
            child={<Button className="w-full bg-transparent text-black text-[12px] border-primary hover:bg-destructive hover:text-white">Delete</Button>}
            text={{head:"Are you sure?", body:"You are about to delete this user"}}
            id={userDetail.id}            
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
              <span>{userDetail.full_name}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Birth Date
              </span>
              <span>{userDetail.birth_date == null ? '-' :  String(userDetail.birth_date).slice(0,10)}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Weight</span>
              <span>{userDetail.weight == null ? '-' :  userDetail.weight+''}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Height</span>
              <span>{ userDetail.height == null ? '-' :  userDetail.height+''}</span>
            </li>
          </ul>
        <Separator className="my-2" />
        <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone Number</span>
              <span>{ userDetail.phone_num == null ? '-' : userDetail.phone_num+''}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{userDetail.email}</span>
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
