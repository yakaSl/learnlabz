
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { CalendarCheck, BookPlus, Upload, MessageSquare } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline">
          <CalendarCheck className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
        <Button variant="outline">
          <BookPlus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Material
        </Button>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  )
}
