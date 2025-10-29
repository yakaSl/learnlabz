export type InstituteUser = {
  id: string;
  name: string;
  email: string;
  role: "Tutor" | "Student" | "Admin";
  status: "Active" | "Pending" | "Suspended";
  joinDate: string;
}

export const instituteUsers: InstituteUser[] = [
    { id: "1", name: "Jane Smith", email: "jane.smith@example.com", role: "Admin", status: "Active", joinDate: "2022-11-20" },
    { id: "2", name: "John Doe", email: "john.doe@example.com", role: "Tutor", status: "Active", joinDate: "2023-01-15" },
    { id: "3", name: "Alice Johnson", email: "alice.j@example.com", role: "Student", status: "Active", joinDate: "2023-08-22" },
    { id: "4", name: "Emily Davis", email: "emily.d@example.com", role: "Tutor", status: "Suspended", joinDate: "2021-09-01" },
    { id: "5", name: "Bob Williams", email: "bob.w@example.com", role: "Student", status: "Active", joinDate: "2024-01-05" },
]
