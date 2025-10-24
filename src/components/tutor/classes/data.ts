export type Class = {
  id: string;
  name: string;
  subject: string;
  schedule: string;
  enrolled: number;
  capacity: number;
  status: "Active" | "Upcoming" | "Completed" | "Draft" | "Paused";
};

export const personalClasses: Class[] = [
  {
    id: "1",
    name: "Algebra 101 (Personal)",
    subject: "Math",
    schedule: "Mon, Wed, Fri | 10:00 AM",
    enrolled: 12,
    capacity: 15,
    status: "Active",
  },
  {
    id: "2",
    name: "Physics for Beginners (Personal)",
    subject: "Science",
    schedule: "Tue, Thu | 2:00 PM",
    enrolled: 8,
    capacity: 10,
    status: "Active",
  },
    {
    id: "5",
    name: "Calculus Prep (Personal)",
    subject: "Math",
    schedule: "Tue | 6:00 PM",
    enrolled: 4,
    capacity: 8,
    status: "Upcoming",
  },
     {
    id: "6",
    name: "History of Ancient Rome (Personal)",
    subject: "History",
    schedule: "Wed | 1:00 PM",
    enrolled: 0,
    capacity: 15,
    status: "Draft",
  }
];

export const instituteClasses: Class[] = [
   {
    id: "3",
    name: "Creative Writing Workshop (Institute)",
    subject: "English",
    schedule: "Sat | 11:00 AM",
    enrolled: 5,
    capacity: 12,
    status: "Upcoming",
  },
   {
    id: "4",
    name: "Intro to Python (Institute)",
    subject: "Programming",
    schedule: "Mon, Fri | 5:00 PM",
    enrolled: 10,
    capacity: 10,
    status: "Completed",
  },
];

export const classes = [...personalClasses, ...instituteClasses];
