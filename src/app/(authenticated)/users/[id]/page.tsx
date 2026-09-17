"use server"

import { Copy, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import UserApi from "@/app/api/UserApi"
import ChangePasswordDialog from "./changePasswordDialog"
import EditDialog from "./EditDialog"
import { DeleteUserDialog } from "./deleteUserDialog"
import { redirect } from "next/navigation"

export default async function UserDetail({ params }: { params: { id: string } }) {
  let id = parseInt(params.id)

  if (isNaN(id)) redirect('/users')

  const userDetail = JSON.parse(JSON.stringify(await UserApi.getById(id)))

  if (userDetail)
    return (
      <Card className="overflow-hidden w-1/3 m-auto">
        <title>User detail</title>
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
            <CardDescription>Last modified: {new Date(userDetail.modified_at).toDateString()}</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                  <div>
                    <EditDialog
                      child={
                        <span className="w-full text-xs cursor-pointer block py-1.5 px-2">
                          Edit
                        </span>
                      }
                      user={userDetail}
                    />
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                  <div>
                    <ChangePasswordDialog
                      child={
                        <span className="w-full text-xs cursor-pointer block py-1.5 px-2">
                          Change password
                        </span>
                      }
                      user={userDetail}
                    />
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                  <div>
                    <DeleteUserDialog
                      child={
                        <span className="w-full text-xs cursor-pointer block py-1.5 px-2 text-destructive">
                          Delete
                        </span>
                      }
                      text={{ head: "Are you sure?", body: "You are about to delete this user" }}
                      id={userDetail.id}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Full Name</span>
                <span>{userDetail.full_name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Birth Date</span>
                <span>{userDetail.birth_date == null ? '-' : String(userDetail.birth_date).slice(0, 10)}</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Weight</span>
                <span>{userDetail.weight == null ? '-' : userDetail.weight + ''}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Height</span>
                <span>{userDetail.height == null ? '-' : userDetail.height + ''}</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone Number</span>
                <span>{userDetail.phone_num == null ? '-' : userDetail.phone_num + ''}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{userDetail.email}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
}