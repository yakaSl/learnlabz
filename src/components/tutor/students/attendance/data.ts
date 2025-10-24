
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export type AttendanceRecord = {
  date: string;
  status: AttendanceStatus;
  class: string;
  reason?: string;
  tutorComment?: string;
};

// Mock data for the current month
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

export const attendanceData: AttendanceRecord[] = [
  { date: new Date(year, month, 2).toISOString(), status: 'Present', class: 'Algebra 101' },
  { date: new Date(year, month, 3).toISOString(), status: 'Present', class: 'Physics' },
  { date: new Date(year, month, 4).toISOString(), status: 'Absent', class: 'Algebra 101', reason: "Doctor's Appointment", tutorComment: "Notified in advance." },
  { date: new Date(year, month, 5).toISOString(), status: 'Present', class: 'Physics' },
  { date: new Date(year, month, 6).toISOString(), status: 'Late', class: 'Algebra 101', tutorComment: "Arrived 10 minutes late." },
  { date: new Date(year, month, 9).toISOString(), status: 'Present', class: 'Algebra 101' },
  { date: new Date(year, month, 10).toISOString(), status: 'Excused', class: 'Physics', reason: "Family emergency", tutorComment: "Parent called." },
  { date: new Date(year, month, 11).toISOString(), status: 'Present', class: 'Algebra 101' },
  { date: new Date(year, month, 12).toISOString(), status: 'Late', class: 'Physics', tutorComment: "Arrived 5 minutes late." },
  { date: new Date(year, month, 13).toISOString(), status: 'Absent', class: 'Algebra 101', tutorComment: "No reason provided." },
];
