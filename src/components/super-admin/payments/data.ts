export type Transaction = {
  id: string;
  date: string;
  user: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  method: "Credit Card" | "PayPal" | "Bank Transfer";
  type: "Subscription" | "Payout" | "Platform Fee" | "Refund";
};

export const transactions: Transaction[] = [
  { id: "txn_1", date: "2024-07-20", user: "Bright Minds Academy", amount: 1200.00, status: "Completed", method: "Credit Card", type: "Subscription" },
  { id: "txn_2", date: "2024-07-20", user: "Tutor John Doe", amount: 450.50, status: "Completed", method: "Bank Transfer", type: "Payout" },
  { id: "txn_3", date: "2024-07-19", user: "Innovate Learning Co.", amount: 50.00, status: "Completed", method: "PayPal", type: "Platform Fee" },
  { id: "txn_4", date: "2024-07-19", user: "Student Jane Smith", amount: 75.00, status: "Refunded", method: "Credit Card", type: "Refund" },
  { id: "txn_5", date: "2024-07-18", user: "Global Tutoring", amount: 300.00, status: "Pending", method: "Bank Transfer", type: "Subscription" },
  { id: "txn_6", date: "2024-07-18", user: "Tutor Emily Davis", amount: 800.00, status: "Failed", method: "Bank Transfer", type: "Payout" },
];
