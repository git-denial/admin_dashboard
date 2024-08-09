"use client"
import * as React from "react"
import Link from "next/link"
import {
  User,
  HeartPulse,
  Clipboard
} from "lucide-react"

import { usePathname } from "next/navigation"


function SidebarSelection() {

    const pathname = usePathname()

  return (
    <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              
              <Link
                href="/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "users"  ? `bg-muted text-primary` : `text-muted-foreground`}  transition-all hover:text-primary`}
              >
                <User className="h-4 w-4" />
                Users
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>

              <Link
                href="/cardiologists"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "cardiologists" ? `bg-muted text-primary` : `text-muted-foreground`} transition-all hover:text-primary`}
              >
                <HeartPulse className="h-4 w-4" />
                Cardiologists
              </Link>

              <Link
                href="/consultations"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "consultations" ? `bg-muted text-primary` : `text-muted-foreground`} transition-all hover:text-primary`}
              >
                <Clipboard className="h-4 w-4" />
                Consultations
              </Link>
              
            </nav>
          </div>
  )
}

export { SidebarSelection }
