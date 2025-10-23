export type Tutor = {
  id: string
  name: string
  avatar: string
  subjects: string[]
  activeClasses: number
  performanceRating: number
  status: "Active" | "Pending" | "On-leave"
}

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://picsum.photos/seed/tutor1/128/128",
    subjects: ["Math", "Physics"],
    activeClasses: 5,
    performanceRating: 4.8,
    status: "Active",
  },
  {
    id: "2",
    name: "Emily Davis",
    avatar: "https://picsum.photos/seed/tutor2/128/128",
    subjects: ["English", "History"],
    activeClasses: 4,
    performanceRating: 4.9,
    status: "Active",
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    avatar: "https://picsum.photos/seed/tutor3/128/128",
    subjects: ["Chemistry", "Biology"],
    activeClasses: 3,
    performanceRating: 4.6,
    status: "On-leave",
  },
  {
    id: "4",
    name: "Aisha Khan",
    avatar: "https://picsum.photos/seed/tutor4/128/128",
    subjects: ["Computer Science"],
    activeClasses: 6,
    performanceRating: 4.7,
    status: "Active",
  },
  {
    id: "5",
    name: "Kenji Tanaka",
    avatar: "https://picsum.photos/seed/tutor5/128/128",
    subjects: ["Art", "Music"],
    activeClasses: 2,
    performanceRating: 4.5,
    status: "Active",
  },
  {
    id: "6",
    name: "Olivia Chen",
    avatar: "https://picsum.photos/seed/tutor6/128/128",
    subjects: ["French", "Spanish"],
    activeClasses: 0,
    performanceRating: 0,
    status: "Pending",
  },
];
