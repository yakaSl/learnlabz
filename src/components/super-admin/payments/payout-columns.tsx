
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Payout } from "./payouts-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/app/lib/utils"
import Link from "next/link"


const getStatusVariant = (status: string) => {
    switch (status) {
        case 'Approved': return 'default';
        case 'Pending': return 'secondary';
        case 'On Hold': return 'destructive';
        case 'Failed': return 'destructive';
        default: return 'outline';
    }
}

const getRiskVariant = (risk: string) => {
    switch (risk) {
        case 'Low': return 'default';
        case 'Medium': return 'secondary';
        case 'High': return 'destructive';
        default: return 'outline';
    }
}


export const columns: ColumnDef<Payout>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "tutorName",
    header: "Tutor",
    cell: ({ row }) => {
        const payout = row.original;
        return (
            <Link href={`/super-admin/payments/payouts/${payout.id}`} className="flex items-center gap-2 hover:underline">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={payout.tutorAvatar} alt={payout.tutorName} />
                    <AvatarFallback>{payout.tutorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{payout.tutorName}</span>
            </Link>
        )
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
        return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "transactions",
    header: "Transactions",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
  },
   {
    accessorKey: "riskLevel",
    header: "Risk Level (AI)",
    cell: ({ row }) => (
      <Badge variant={getRiskVariant(row.getValue("riskLevel"))}>
        {row.getValue("riskLevel")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payout = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/super-admin/payments/payouts/${payout.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Approve Payout</DropdownMenuItem>
            <DropdownMenuItem>Place on Hold</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Reject Payout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
