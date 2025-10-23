
export type Class = {
  id: string;
  name: string;
  subject: string;
  tutor: string;
  nextSession: string;
  progress: number;
  status: "Live Now" | "Upcoming" | "Completed" | "Scheduled";
};

export const classes: Class[] = [
  {
    id: "1",
    name: "Algebra 101",
    subject: "Math",
    tutor: "Mr. John Doe",
    nextSession: "Today at 10:00 AM",
    progress: 75,
    status: "Upcoming",
  },
  {
    id: "2",
    name: "Physics for Beginners",
    subject: "Science",
    tutor: "Mrs. Emily Davis",
    nextSession: "Today at 11:30 AM",
    progress: 40,
    status: "Upcoming",
  },
  {
    id: "3",
    name: "Creative Writing Workshop",
    subject: "English",
    tutor: "Mr. Kenji Tanaka",
    nextSession: "Tomorrow at 2:00 PM",
    progress: 15,
    status: "Scheduled",
  },
   {
    id: "4",
    name: "Intro to Python",
    subject: "Programming",
    tutor: "Ms. Aisha Khan",
    nextSession: "Yesterday",
    progress: 100,
    status: "Completed",
  },
];
