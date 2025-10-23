
export type Attendance = {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
};

// Mock data for the current month
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

export const attendanceData: Attendance[] = [
  { date: new Date(year, month, 2).toISOString(), status: 'Present' },
  { date: new Date(year, month, 3).toISOString(), status: 'Present' },
  { date: new Date(year, month, 4).toISOString(), status: 'Absent' },
  { date: new Date(year, month, 5).toISOString(), status: 'Present' },
  { date: new Date(year, month, 6).toISOString(), status: 'Late' },
  { date: new Date(year, month, 9).toISOString(), status: 'Present' },
  { date: new Date(year, month, 10).toISOString(), status: 'Excused' },
  { date: new Date(year, month, 11).toISOString(), status: 'Present' },
];
