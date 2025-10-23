
export type Student = {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  classes: string[];
  performanceLevel: "Exceeding" | "Meeting" | "At Risk";
  attendance: number;
  engagement: "High" | "Medium" | "Low";
};

export const students: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://picsum.photos/seed/s1/128/128",
    grade: "10th Grade",
    classes: ["Algebra 101", "Physics"],
    performanceLevel: "Exceeding",
    attendance: 98,
    engagement: "High",
  },
  {
    id: "2",
    name: "Bob Williams",
    avatar: "https://picsum.photos/seed/s2/128/128",
    grade: "9th Grade",
    classes: ["Algebra 101"],
    performanceLevel: "Meeting",
    attendance: 92,
    engagement: "Medium",
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "https://picsum.photos/seed/s3/128/128",
    grade: "10th Grade",
    classes: ["Creative Writing"],
    performanceLevel: "At Risk",
    attendance: 81,
    engagement: "Low",
  },
  {
    id: "4",
    name: "Diana Miller",
    avatar: "https://picsum.photos/seed/s4/128/128",
    grade: "11th Grade",
    classes: ["Physics", "Calculus Prep"],
    performanceLevel: "Exceeding",
    attendance: 100,
    engagement: "High",
  },
];
