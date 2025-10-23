export type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: "Tutor" | "Student" | "Institute Admin" | "Super Admin"
  status: "Active" | "Inactive" | "Suspended"
  institute: string
  joinDate: string
  riskScore: number
}

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://picsum.photos/seed/user1/32/32",
    role: "Tutor",
    status: "Active",
    institute: "Bright Minds Academy",
    joinDate: "2023-01-15",
    riskScore: 1.2,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://picsum.photos/seed/user2/32/32",
    role: "Institute Admin",
    status: "Active",
    institute: "Innovate Learning Co.",
    joinDate: "2022-11-20",
    riskScore: 8.9,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    avatar: "https://picsum.photos/seed/user3/32/32",
    role: "Student",
    status: "Inactive",
    institute: "Global Tutoring",
    joinDate: "2023-05-10",
    riskScore: 2.5,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "https://picsum.photos/seed/user4/32/32",
    role: "Tutor",
    status: "Suspended",
    institute: "Bright Minds Academy",
    joinDate: "2021-09-01",
    riskScore: 4.1,
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@learnlabz.com",
    avatar: "https://picsum.photos/seed/user5/32/32",
    role: "Super Admin",
    status: "Active",
    institute: "Platform-wide",
    joinDate: "2020-01-01",
    riskScore: 0.5,
  },
   {
    id: "6",
    name: "Chris Wilson",
    email: "chris.w@example.com",
    avatar: "https://picsum.photos/seed/user6/32/32",
    role: "Student",
    status: "Active",
    institute: "Innovate Learning Co.",
    joinDate: "2024-02-28",
    riskScore: 1.8,
  },
  {
    id: "7",
    name: "Patricia Taylor",
    email: "pat.t@example.com",
    avatar: "https://picsum.photos/seed/user7/32/32",
    role: "Tutor",
    status: "Active",
    institute: "Global Tutoring",
    joinDate: "2023-08-14",
    riskScore: 9.5,
  },
];
