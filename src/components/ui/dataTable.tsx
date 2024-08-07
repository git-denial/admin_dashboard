"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,

} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "./switch"
import { Label } from "./label"
import Link from "next/link"

const SEARCH_MODE = {
    START: 'START',
    END: 'END',
    EVERYWHERE: 'EVERYWHERE'
}

export default function DataTable({ data, columns, createPageHref }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnFiltersBy, setColumnFiltersBy] = React.useState("")

  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
    });

  const [searchMode, setSearchMode] = React.useState(SEARCH_MODE.START)
  const [globalSearchMode, setGlobalSearchMode] = React.useState(false)

  const [globalFilter, setGlobalFilter] = React.useState('')


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter
    },
    filterFns: {
      myCustomFilter: (row, columnId, filterValue)=>  {
        let value = row.getValue<number | string>(columnId)
        
        if(value == null || value === '') return false


        if(columnId === 'id') value = parseInt(value+'')

        if(columnId === 'birth_date') value = new Date(value).toISOString().substring(0, 10)
  
        if(searchMode === SEARCH_MODE.START) return value.toString().toLowerCase().trim().startsWith(filterValue)
        else if(searchMode === SEARCH_MODE.END) return value.toString().toLowerCase().trim().endsWith(filterValue)
        else return value.toString().toLowerCase().trim().includes(filterValue)
        
      }
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'myCustomFilter' as any,
    // autoResetPageIndex: false,
    // autoResetExpanded: false,
  })

  React.useEffect(()=>{
    table.resetColumnFilters()
    table.resetGlobalFilter()
  },[globalSearchMode, columnFiltersBy])

  return (
    <div className="w-full mx-10 mb-60">   
      <div className="flex items-center py-4">

      <div className="flex items-center space-x-2 mr-2">
        <Label>Global column search</Label>
      <Switch checked={globalSearchMode} onCheckedChange={()=>setGlobalSearchMode(!globalSearchMode)}/>
    </div>

    {globalSearchMode? null : 
    <DropdownMenu>
    <Label>Filter by</Label>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-2 mr-2">
          {columnFiltersBy} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id+'filter'}
                className="capitalize"
                checked={columnFiltersBy === column.id}
                onCheckedChange={(value: any) => setColumnFiltersBy(column.id)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
    }
        
        <DropdownMenu>
        <Label>Search mode</Label>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2 mr-2">
              {searchMode} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.values(SEARCH_MODE)
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column+'filter'}
                    className="capitalize"
                    checked={searchMode === column}
                    onCheckedChange={(value: any) => setSearchMode(column)}
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      
        {/* {<p>{JSON.stringify(table.getColumn(columnFiltersBy)?.getFilterValue())}</p>} */}
        <Input
          placeholder={`Filter ${ globalSearchMode ? '' : columnFiltersBy}...`}
          value={( globalSearchMode? globalFilter : table.getColumn(columnFiltersBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            globalSearchMode? setGlobalFilter(event.target.value) : table.getColumn(columnFiltersBy)?.setFilterValue(event.target.value)
          } 
          className="max-w-sm ml-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      {createPageHref ? <Link href={createPageHref}><Button className="ml-8">Create</Button></Link> : null}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </div>
      </div>

    </div>
  )
}
