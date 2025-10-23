
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, MessageSquare, FileText } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-3 gap-4">
        <Button variant="outline" className="h-16 flex-col gap-1">
          <Wallet className="h-6 w-6 text-accent" />
          <span>Pay Fees</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span>Message Tutor</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col gap-1">
          <FileText className="h-6 w-6 text-secondary" />
          <span>View Report</span>
        </Button>
      </CardContent>
    </Card>
  )
}
