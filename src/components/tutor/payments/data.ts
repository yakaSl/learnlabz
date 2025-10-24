
export type Payment = {
  id: string;
  student: string;
  class: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export const paymentHistory: Payment[] = [
  { id: 'pay_1', student: 'Alice Johnson', class: 'Algebra 101', amount: 50, date: '2024-07-20', status: 'Paid' },
  { id: 'pay_2', student: 'Diana Miller', class: 'Physics', amount: 75, date: '2024-07-18', status: 'Paid' },
  { id: 'pay_3', student: 'Bob Williams', class: 'Algebra 101', amount: 50, date: '2024-07-15', status: 'Pending' },
  { id: 'pay_4', student: 'Charlie Brown', class: 'Creative Writing', amount: 60, date: '2024-07-10', status: 'Overdue' },
  { id: 'pay_5', student: 'Ethan Jones', class: 'Algebra 101', amount: 50, date: '2024-07-22', status: 'Paid' },
];

export type Payout = {
    id: string;
    date: string;
    gross: number;
    fees: number;
    net: number;
    status: 'Completed' | 'Pending' | 'Failed';
};

export const payoutHistory: Payout[] = [
    { id: 'payout_1', date: 'July 15, 2024', gross: 920.00, fees: 46.00, net: 874.00, status: 'Completed' },
    { id: 'payout_2', date: 'July 8, 2024', gross: 850.50, fees: 42.53, net: 807.97, status: 'Completed' },
    { id: 'payout_3', date: 'July 1, 2024', gross: 980.00, fees: 49.00, net: 931.00, status: 'Completed' },
];
