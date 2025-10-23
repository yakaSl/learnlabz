export type Material = {
    id: string;
    name: string;
    type: 'folder' | 'pdf' | 'video' | 'docx';
    class: string;
    size: string;
    lastModified: string;
    isRecommended?: boolean;
    isBookmarked?: boolean;
};

export const materials: Material[] = [
    { id: '1', name: 'Algebra 101', type: 'folder', class: '', size: '3 items', lastModified: '2 days ago', isBookmarked: true },
    { id: '2', name: 'Physics Lectures', type: 'folder', class: '', size: '5 items', lastModified: '1 day ago' },
    { id: '3', name: 'Chapter 1 Notes.pdf', type: 'pdf', class: 'Algebra 101', size: '1.2MB', lastModified: '3 days ago', isRecommended: true },
    { id: '4', name: 'Intro to Forces.mp4', type: 'video', class: 'Physics', size: '128MB', lastModified: '1 day ago' },
    { id: '5', name: 'Essay Outline.docx', type: 'docx', class: 'Creative Writing', size: '32KB', lastModified: '5 days ago', isBookmarked: true },
    { id: '6', name: 'Lab Safety Video.mp4', type: 'video', class: 'Physics', size: '54MB', lastModified: '1 week ago', isRecommended: true },
];
