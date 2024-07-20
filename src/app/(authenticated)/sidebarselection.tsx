"use client"
import * as React from "react"
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  BarChart,
  User,
  LucideUserX2,
  Star,
  UserCheck,
  UserCheck2,
  PlusCircle,
  HeartPulse
} from "lucide-react"

import { usePathname } from "next/navigation"


function SidebarSelection() {

    const pathname = usePathname()

  return (
    <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "users"  ? `bg-muted text-primary` : `text-muted-foreground`}  transition-all hover:text-primary`}
              >
                <User className="h-4 w-4" />
                Users
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>

              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "cardiologists" ? `bg-muted text-primary` : `text-muted-foreground`} transition-all hover:text-primary`}
              >
                <HeartPulse className="h-4 w-4" />
                Cardiologists
              </Link>

              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "relatives" ? `bg-muted text-primary` : `text-muted-foreground`} text-muted-foreground transition-all hover:text-primary`}
              >
                <Users className="h-4 w-4" />
                Relatives
              </Link>

              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname.split("/")[1] ===  "admins" ? `bg-muted text-primary` : `text-muted-foreground`} text-muted-foreground transition-all hover:text-primary`}
              >
                <UserCheck2 className="h-4 w-4" />
                Admins
              </Link>
              
            </nav>
          </div>
  )
}

export { SidebarSelection }