
export const tutors = [
    { id: 1, name: "Mr. John Doe", subject: "Algebra 101", avatar: "https://picsum.photos/seed/tutor1/40/40" },
    { id: 2, name: "Mrs. Emily Davis", subject: "Physics for Beginners", avatar: "https://picsum.photos/seed/tutor2/40/40" },
    { id: 3, name: "Mr. Kenji Tanaka", subject: "Creative Writing", avatar: "https://picsum.photos/seed/tutor5/40/40" },
];

export const messages = [
    { id: 1, from: "Mr. John Doe", title: "Update on Alex's Progress", snippet: "Hi Maria, I wanted to share some positive news about Alex's recent quiz scores...", time: "10m ago", read: false },
    { id: 2, from: "Mrs. Emily Davis", title: "Parent-Teacher Conference", snippet: "Just a reminder about our meeting next Tuesday at 4 PM.", time: "1h ago", read: true },
    { id: 3, from: "System", title: "Announcement: School Fair", snippet: "The annual school fair will be held this Saturday. We hope to see you there!", time: "yesterday", read: true },
];

export const selectedMessage = {
    from: "Mr. John Doe",
    fromEmail: "j.doe@learnlabz.com",
    avatar: "https://picsum.photos/seed/tutor1/32/32",
    title: "Update on Alex's Progress",
    thread: [
        { from: "Mr. John Doe", text: "Hi Maria, I wanted to share some positive news about Alex's recent quiz scores. He's shown great improvement over the last two weeks!", time: "10m ago" },
        { from: "You", text: "That's wonderful to hear! Thank you for the update.", time: "2m ago" },
    ]
}
