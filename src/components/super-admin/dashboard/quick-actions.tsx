import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { PlusCircle, Megaphone, Wrench, ShieldAlert } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Institute
        </Button>
        <Button variant="outline">
          <Megaphone className="mr-2 h-4 w-4" />
          Broadcast
        </Button>
        <Button variant="outline">
          <Wrench className="mr-2 h-4 w-4" />
          System Config
        </Button>
        <Button variant="outline" >
          <ShieldAlert className="mr-2 h-4 w-4" />
          Security Scan
        </Button>
      </CardContent>
    </Card>
  )
}
