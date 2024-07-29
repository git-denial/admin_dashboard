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

            <React.Fragment key={`frag${i}`}>
              <BreadcrumbItem key={`bcitem${i}`}>
                {
                  pathnames[pathnames.length - 1] === p ?
                    <BreadcrumbPage key={`bcpage${i}`}>{p}</BreadcrumbPage>
                    :
                    <BreadcrumbLink key={`bclink${i}`} href={`${pathnames.slice(0, i + 1).join('/')}`}>{p}</BreadcrumbLink>
                }
              </BreadcrumbItem>
              {i === 0 ? null : <BreadcrumbSeparator key={`bcsepara${i}`} />}
            </React.Fragment>


          )}
        </BreadcrumbList>

      </Breadcrumb>

    </div>
  )
}

export { Topbreadcrumb }
