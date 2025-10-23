import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserTable } from "@/components/super-admin/users/user-table";
import { users, type User } from "@/components/super-admin/users/data";
import { getColumns } from "@/components/super-admin/users/columns";

export default function UserManagement() {
  // In a real app, you'd fetch this data from an API
  const data: User[] = users;
  const columns = getColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all users across the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
