
"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "./data-table-view-options"
import { Download, Trash, UserX, UserCheck } from "lucide-react"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { roles, statuses } from "./data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search users..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("role") && (
                  <DataTableFacetedFilter
                    column={table.getColumn("role")}
                    title="Role"
                    options={roles}
                  />
                )}
                {table.getColumn("status") && (
                  <DataTableFacetedFilter
                    column={table.getColumn("status")}
                    title="Status"
                    options={statuses}
                  />
                )}
                 {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                    </Button>
                )}
            </div>
            <div className="flex items-center space-x-2">
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                     <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                            <UserX className="mr-2 h-4 w-4" />
                            Suspend
                        </Button>
                         <Button variant="destructive" size="sm" className="h-8">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                )}
                <DataTableViewOptions table={table} />
            </div>
        </div>
  )
}
