export type Payout = {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  amount: number;
  transactions: number;
  status: "Pending" | "On Hold" | "Approved" | "Failed";
  riskLevel: "Low" | "Medium" | "High";
};

export const payouts: Payout[] = [
  {
    id: "p_1",
    tutorName: "John Doe",
    tutorAvatar: "https://picsum.photos/seed/tutor1/32/32",
    amount: 1250.75,
    transactions: 15,
    status: "Pending",
    riskLevel: "Low",
  },
  {
    id: "p_2",
    tutorName: "Emily Davis",
    tutorAvatar: "https://picsum.photos/seed/tutor2/32/32",
    amount: 875.00,
    transactions: 10,
    status: "Pending",
    riskLevel: "Low",
  },
  {
    id: "p_3",
    tutorName: "Carlos Rodriguez",
    tutorAvatar: "https://picsum.photos/seed/tutor3/32/32",
    amount: 2300.50,
    transactions: 25,
    status: "On Hold",
    riskLevel: "High",
  },
  {
    id: "p_4",
    tutorName: "Aisha Khan",
    tutorAvatar: "https://picsum.photos/seed/tutor4/32/32",
    amount: 1800.00,
    transactions: 20,
    status: "Pending",
    riskLevel: "Medium",
  },
  {
    id: "p_5",
    tutorName: "Kenji Tanaka",
    tutorAvatar: "https://picsum.photos/seed/tutor5/32/32",
    amount: 950.25,
    transactions: 12,
    status: "Approved",
    riskLevel: "Low",
  },
];
