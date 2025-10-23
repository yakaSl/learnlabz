
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const children = [
    { name: "Alex Garcia", avatar: "https://picsum.photos/seed/student-user/32/32" },
    { name: "Sofia Garcia", avatar: "https://picsum.photos/seed/student2/32/32" },
];

export function ChildSelector() {
    return (
        <Select defaultValue={children[0].name}>
            <SelectTrigger className="w-auto border-none shadow-none text-lg font-semibold focus:ring-0">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {children.map(child => (
                    <SelectItem key={child.name} value={child.name}>
                       <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={child.avatar} alt={child.name} />
                                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{child.name}</span>
                       </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
