
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserTable } from "@/components/super-admin/users/user-table";
import { users, type User } from "@/components/super-admin/users/data";
import { getColumns } from "@/components/super-admin/users/columns";

interface UserManagementProps {
  roleFilter?: 'Tutor' | 'Student';
}

export default function UserManagement({ roleFilter }: UserManagementProps) {
  // In a real app, you'd fetch this data from an API
  const data: User[] = roleFilter 
    ? users.filter(user => user.role === roleFilter) 
    : users;

  const columns = getColumns();
  
  const title = roleFilter ? `${roleFilter}s` : 'All Users';
  const description = `Manage all ${roleFilter ? `${roleFilter.toLowerCase()}s` : 'users'} across the platform.`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
