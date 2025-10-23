import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type WhiteLabelRequest = {
  id: number;
  instituteName: string;
  requestedBy: string;
  date: string;
};

interface WhiteLabelQueueProps {
  requests: WhiteLabelRequest[];
}

export function WhiteLabelQueue({ requests }: WhiteLabelQueueProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>White-Label Queue</CardTitle>
        <CardDescription>Approve or deny branding requests.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.length > 0 ? requests.map(request => (
          <div key={request.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{request.instituteName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="font-semibold">{request.instituteName}</p>
              <p className="text-sm text-muted-foreground">{request.requestedBy} &bull; {request.date}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 hover:bg-green-500/10">
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 hover:bg-red-500/10">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )) : (
          <p className="text-center text-muted-foreground py-4">No pending requests.</p>
        )}
      </CardContent>
    </Card>
  );
}
