"use client"

import * as React from "react"
import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cardiologists as Cardiologist } from "@prisma/client"
import Link from "next/link"
import AlertDialogue from "@/components/ui/AlertDialog"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { deleteCardiologist } from "@/app/server_actions/cardiologist"



export const CardiologistDataTableColumns: ColumnDef<Cardiologist>[] = [
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
    filterFn: 'myCustomFilter' as any
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
    accessorKey: "phone_num",
    header: () => "Phone Number",
    cell: ({ row }) => <div>{row.getValue("phone_num")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter:false,
    enableGlobalFilter:false,

    cell: ({ row }) => {
      const cardiologist = row.original
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
              <Link href={`/cardiologists/${cardiologist.id}`}>
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
            bodyMsg={`You are about to delete cardiologist with id ${cardiologist.id}`}
            continueFunction={async() => {
              try {

                let data = await deleteCardiologist(cardiologist.id)
                                  
                  toast({
                    title: "Success",
                    description: `Cardiologist with id ${data.id} deleted`,
                  })

                  router.refresh()

              } catch (error) {
                setOpen(false)
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: String(error)                  
                })
               
              }
              
            }}
          />
        </>


      )
    },
  },
]