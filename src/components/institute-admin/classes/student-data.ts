
export type EnrolledStudent = {
  id: string;
  name: string;
  avatar: string;
  status: "Active" | "Withdrawn";
  performance: "Exceeding" | "Meeting" | "At Risk";
  attendance: number;
};

export const enrolledStudents: EnrolledStudent[] = [
  { id: "1", name: "Alice Johnson", avatar: "https://picsum.photos/seed/s1/40/40", status: "Active", performance: "Exceeding", attendance: 98 },
  { id: "2", name: "Bob Williams", avatar: "https://picsum.photos/seed/s2/40/40", status: "Active", performance: "Meeting", attendance: 92 },
  { id: "3", name: "Charlie Brown", avatar: "https://picsum.photos/seed/s3/40/40", status: "Withdrawn", performance: "At Risk", attendance: 81 },
  { id: "4", name: "Diana Miller", avatar: "https://picsum.photos/seed/s4/40/40", status: "Active", performance: "Meeting", attendance: 95 },
];
