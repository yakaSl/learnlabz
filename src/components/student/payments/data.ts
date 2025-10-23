
export type Invoice = {
  id: string;
  class: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export const invoices: Invoice[] = [
  { id: 'INV-2024-001', class: 'Algebra 101', amount: 250, dueDate: 'July 1, 2024', status: 'Paid' },
  { id: 'INV-2024-002', class: 'Physics for Beginners', amount: 300, dueDate: 'July 5, 2024', status: 'Paid' },
  { id: 'INV-2024-003', class: 'Creative Writing', amount: 150, dueDate: 'July 10, 2024', status: 'Paid' },
  { id: 'INV-2024-004', class: 'Algebra 101', amount: 250, dueDate: 'August 1, 2024', status: 'Paid' },
  { id: 'INV-2024-005', class: 'Physics for Beginners', amount: 300, dueDate: 'August 5, 2024', status: 'Pending' },
  { id: 'INV-2024-006', class: 'History of Rome', amount: 200, dueDate: 'July 20, 2024', status: 'Overdue' },
];
