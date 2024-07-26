"use client"

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { users as User } from "@prisma/client"
import Link from "next/link"
import AlertDialogue from "@/components/ui/AlertDialog"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { deleteUser } from "@/app/server_actions/user"



export const UserDataTableColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "birth_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Birth Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div>{String(row.getValue("birth_date")).slice(0, 10)}</div>,
    filterFn: 'myCustomFilter' as any
    
  },
  {
    accessorKey: "weight",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Weight
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("weight")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "height",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Height
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("height")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "phone_num",
    header: () => "Phone Number",
    cell: ({ row }) => <div>{row.getValue("phone_num")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      const [open, setOpen] = useState(false)
      const { toast } = useToast()
      const router = useRouter()
      

      return (
        <>
        
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <Link href={`/users/${user.id}`}>
                <DropdownMenuItem>
                  View detail
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {/* {AlertDialogue(<DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-white">Delete</DropdownMenuItem>, "a", "b", ()=>alert('a'))} */}
              {/* <AlertDialogue 
            child={<DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-white">Delete</DropdownMenuItem>}
            headMsg={'Are you sure'}
            bodyMsg={'Are you really sure'}
            /> */}

              <DropdownMenuItem onClick={() => setOpen(true)} className="text-destructive focus:bg-destructive focus:text-white">Delete</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogue
            opened={open}
            onOpenChange={setOpen}
            headMsg="Are you sure ?"
            bodyMsg={`You are about to delete user with id ${user.id}`}
            continueFunction={async() => {
              try {
                // const res = await fetch(`http://localhost:3000/api/user/${user.id}`,
                //   {
                //     method: 'DELETE', 
                //     headers:{'Content-Type': 'application/json'}, 
                //     body:JSON.stringify({})
                //   })

                //   const data = await res.json()

                let data = await deleteUser(user.id)
                                  
                  toast({
                    title: "Success",
                    description: `User with id ${data.id} deleted`,
                    // action: <ToastAction altText="Try again">Try again</ToastAction>,
                  })

                  router.refresh()

              } catch (error) {
                setOpen(false)
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: String(error),
                  // action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
               
              }
              
            }}
          />
        </>


      )
    },
  },
]