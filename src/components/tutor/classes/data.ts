export type Class = {
  id: string;
  name: string;
  subject: string;
  schedule: string;
  enrolled: number;
  capacity: number;
  status: "Active" | "Upcoming" | "Completed" | "Draft" | "Paused";
};

export const classes: Class[] = [
  {
    id: "1",
    name: "Algebra 101",
    subject: "Math",
    schedule: "Mon, Wed, Fri | 10:00 AM",
    enrolled: 12,
    capacity: 15,
    status: "Active",
  },
  {
    id: "2",
    name: "Physics for Beginners",
    subject: "Science",
    schedule: "Tue, Thu | 2:00 PM",
    enrolled: 8,
    capacity: 10,
    status: "Active",
  },
  {
    id: "3",
    name: "Creative Writing Workshop",
    subject: "English",
    schedule: "Sat | 11:00 AM",
    enrolled: 5,
    capacity: 12,
    status: "Upcoming",
  },
   {
    id: "4",
    name: "Intro to Python",
    subject: "Programming",
    schedule: "Mon, Fri | 5:00 PM",
    enrolled: 10,
    capacity: 10,
    status: "Completed",
  },
    {
    id: "5",
    name: "Calculus Prep",
    subject: "Math",
    schedule: "Tue | 6:00 PM",
    enrolled: 4,
    capacity: 8,
    status: "Upcoming",
  },
     {
    id: "6",
    name: "History of Ancient Rome",
    subject: "History",
    schedule: "Wed | 1:00 PM",
    enrolled: 0,
    capacity: 15,
    status: "Draft",
  }
];
