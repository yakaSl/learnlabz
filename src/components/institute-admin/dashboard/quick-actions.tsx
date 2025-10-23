
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { PlusCircle, UserPlus, Megaphone, BookPlus } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
        <Button variant="outline">
          <BookPlus className="mr-2 h-4 w-4" />
          Create Class
        </Button>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Invite Tutor
        </Button>
        <Button variant="outline">
          <Megaphone className="mr-2 h-4 w-4" />
          Send Announcement
        </Button>
      </CardContent>
    </Card>
  )
}
