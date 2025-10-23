
import { CalendarEvent } from './schedule-calendar';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

export const scheduleData: CalendarEvent[] = [
  { id: '1', title: 'Algebra 101', date: new Date(year, month, today.getDate(), 10, 0), duration: 60, type: 'class', color: 'bg-blue-500' },
  { id: '2', title: 'Physics for Beginners', date: new Date(year, month, today.getDate(), 11, 30), duration: 90, type: 'class', color: 'bg-green-500' },
  { id: '3', title: 'History Mid-Term', date: new Date(year, month, today.getDate() + 2), duration: 120, type: 'assessment', color: 'bg-red-500' },
  { id: '4', title: 'Algebra 101', date: new Date(year, month, today.getDate() + 2, 10, 0), duration: 60, type: 'class', color: 'bg-blue-500' },
  { id: '5', title: 'Creative Writing', date: new Date(year, month, today.getDate() + 1, 14, 0), duration: 60, type: 'class', color: 'bg-purple-500' },
  { id: '6', title: 'Physics for Beginners', date: new Date(year, month, today.getDate() + 1, 11, 30), duration: 90, type: 'class', color: 'bg-green-500' },
];
