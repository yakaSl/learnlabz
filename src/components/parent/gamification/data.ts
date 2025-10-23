
import { BookOpen, Repeat, Star, Target } from "lucide-react";

export const pointsData = {
    level: 5,
    title: "Novice Learner",
    currentPoints: 1250,
    pointsForNextLevel: 2000,
};

export type Badge = {
    id: number;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    unlocked: boolean;
}

export const badges: Badge[] = [
    { id: 1, name: "First Steps", description: "Complete your first lesson.", icon: Star, color: "bg-green-500", unlocked: true },
    { id: 2, name: "Streak Keeper", description: "Log in for 3 days in a row.", icon: Repeat, color: "bg-blue-500", unlocked: true },
    { id: 3, name: "Quiz Master", description: "Get a perfect score on a quiz.", icon: Target, color: "bg-purple-500", unlocked: false },
    { id: 4, name: "Bookworm", description: "Read 5 course materials.", icon: BookOpen, color: "bg-orange-500", unlocked: false },
];

export type LeaderboardUser = {
    id: string;
    name: string;
    avatar: string;
    points: number;
    rank: number;
}

export const leaderboardData: LeaderboardUser[] = [
    { id: "1", name: "Alice Johnson", avatar: "https://picsum.photos/seed/s1/32/32", points: 1500, rank: 1 },
    { id: "2", name: "Alex Garcia", avatar: "https://picsum.photos/seed/student-user/32/32", points: 1250, rank: 2 },
    { id: "3", name: "Bob Williams", avatar: "https://picsum.photos/seed/s2/32/32", points: 1100, rank: 3 },
    { id: "4", name: "Charlie Brown", avatar: "https://picsum.photos/seed/s3/32/32", points: 950, rank: 4 },
];
