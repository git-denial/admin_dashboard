"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


function Topbreadcrumb() {

  const pathnames = usePathname().split('/')

  return (
    <div className="w-full flex-1">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {pathnames.map((p, i) =>

            <>
              <BreadcrumbItem>
                {
                  pathnames[pathnames.length - 1] === p ?
                    <BreadcrumbPage>{p}</BreadcrumbPage>
                    :
                    <BreadcrumbLink href={`${pathnames.slice(0, i + 1).join('/')}`}>{p}</BreadcrumbLink>
                }
              </BreadcrumbItem>
              {i === 0 ? null : <BreadcrumbSeparator />}
            </>


          )}
        </BreadcrumbList>

      </Breadcrumb>

    </div>
  )
}

export { Topbreadcrumb }
