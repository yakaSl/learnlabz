import UserManagement from "@/components/super-admin/users/user-management";

export default function SuperAdminStudentsPage() {
  return <UserManagement roleFilter="Student" />;
}
