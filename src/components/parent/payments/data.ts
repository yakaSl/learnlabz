
export type Invoice = {
  id: string;
  child: string;
  class: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export const invoices: Invoice[] = [
  { id: 'INV-2024-001', child: 'Alex Garcia', class: 'Algebra 101', amount: 250, dueDate: 'July 1, 2024', status: 'Paid' },
  { id: 'INV-2024-002', child: 'Alex Garcia', class: 'Physics for Beginners', amount: 300, dueDate: 'August 5, 2024', status: 'Pending' },
  { id: 'INV-2024-003', child: 'Sofia Garcia', class: 'Creative Writing', amount: 150, dueDate: 'July 10, 2024', status: 'Paid' },
  { id: 'INV-2024-006', child: 'Alex Garcia', class: 'History of Rome', amount: 200, dueDate: 'July 20, 2024', status: 'Overdue' },
];

export type PaymentMethod = {
    id: string;
    type: 'Visa' | 'Mastercard';
    details: string;
    expiry: string;
    isDefault?: boolean;
    icon: string;
}

export const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'Visa', details: 'Visa ending in 1234', expiry: '08/26', isDefault: true, icon: '/credit-cards/visa.svg'},
    { id: '2', type: 'Mastercard', details: 'Mastercard ending in 5678', expiry: '10/25', icon: '/credit-cards/mastercard.svg' },
]
