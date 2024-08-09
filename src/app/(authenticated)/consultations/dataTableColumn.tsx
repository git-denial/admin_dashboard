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

import { consultations as Consultation } from "@prisma/client"
import Link from "next/link"
import AlertDialogue from "@/components/ui/AlertDialog"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { deleteConsultation } from "@/app/server_actions/consultation"



export const ConsultationsDataTableColumns: ColumnDef<Consultation>[] = [
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
    accessorKey: "user_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("user_name")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "cardiologist_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cardiologist
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("cardiologist_name")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
    filterFn: 'myCustomFilter' as any
  },
  {
    accessorKey: "start_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div>{String(row.getValue("start_at")).slice(0, 10)}</div>,
    filterFn: 'myCustomFilter' as any
    
  },
  {
    accessorKey: "end_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <div>{String(row.getValue("end_at")).slice(0, 10)}</div>,
    filterFn: 'myCustomFilter' as any
    
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter:false,
    enableGlobalFilter:false,

    cell: ({ row }) => {
      const consultation = row.original
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
              <Link href={`/consultations/${consultation.id}`}>
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
            bodyMsg={`You are about to delete consultation with id ${consultation.id}`}
            continueFunction={async() => {
              try {

                let data = await deleteConsultation(consultation.id)
                                  
                  toast({
                    title: "Success",
                    description: `Consultation with id ${data.id} deleted`,
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