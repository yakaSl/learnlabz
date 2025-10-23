export type Institute = {
  id: string
  name: string
  logo: string
  admin: string
  activeUsers: number
  subscriptionTier: "Free" | "Basic" | "Premium" | "Enterprise"
  status: "Active" | "Pending" | "Suspended"
  churnRisk: number
}

export const institutes: Institute[] = [
  {
    id: "1",
    name: "Bright Minds Academy",
    logo: "https://picsum.photos/seed/bma-logo/64/64",
    admin: "Jane Smith",
    activeUsers: 1500,
    subscriptionTier: "Premium",
    status: "Active",
    churnRisk: 15,
  },
  {
    id: "2",
    name: "Innovate Learning Co.",
    logo: "https://picsum.photos/seed/ilc-logo/64/64",
    admin: "Carlos Garcia",
    activeUsers: 350,
    subscriptionTier: "Basic",
    status: "Active",
    churnRisk: 5,
  },
  {
    id: "3",
    name: "Global Tutoring",
    logo: "https://picsum.photos/seed/gt-logo/64/64",
    admin: "Aisha Khan",
    activeUsers: 89,
    subscriptionTier: "Free",
    status: "Active",
    churnRisk: 30,
  },
  {
    id: "4",
    name: "Quantum Leap Edu",
    logo: "https://picsum.photos/seed/qle-logo/64/64",
    admin: "Kenji Tanaka",
    activeUsers: 5000,
    subscriptionTier: "Enterprise",
    status: "Active",
    churnRisk: 2,
  },
  {
    id: "5",
    name: "NextGen Scholars",
    logo: "https://picsum.photos/seed/ngs-logo/64/64",
    admin: "Olivia Chen",
    activeUsers: 720,
    subscriptionTier: "Premium",
    status: "Suspended",
    churnRisk: 95,
  },
  {
    id: "6",
    name: "Vertex Prep",
    logo: "https://picsum.photos/seed/vp-logo/64/64",
    admin: "Leo Maxwell",
    activeUsers: 210,
    subscriptionTier: "Basic",
    status: "Pending",
    churnRisk: 10,
  },
];

export const whiteLabelRequests = [
    { id: 1, instituteName: "Creative Minds School", requestedBy: "Laura Miles", date: "2 days ago" },
    { id: 2, instituteName: "Apex Digital Tutors", requestedBy: "David Chen", date: "3 days ago" },
]
