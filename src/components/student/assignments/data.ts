export type Assignment = {
  id: string;
  title: string;
  due: string;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  grade: string | null;
  instructions: string;
  feedback: {
    summary: string;
    details: string;
  } | null;
};

export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Algebra Quiz 2',
    due: 'July 29, 2024',
    status: 'Graded',
    grade: 'A-',
    instructions: 'Complete the attached quiz covering chapters 3 and 4. Show all your work for full credit. The quiz consists of 10 multiple-choice questions and 2 short-answer problems.',
    feedback: {
        summary: 'Excellent work!',
        details: 'Great job on the short-answer questions, you clearly understand the concepts. Be careful with question #7, you made a small calculation error but the method was correct.'
    }
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    due: 'August 5, 2024',
    status: 'Submitted',
    grade: null,
    instructions: 'Write a 2-page lab report on the "Conservation of Momentum" experiment. Include your hypothesis, methods, results, and a conclusion. Data charts are required.',
    feedback: null
  },
  {
    id: '3',
    title: 'Writing Essay Draft',
    due: 'August 10, 2024',
    status: 'Pending',
    grade: null,
    instructions: 'Submit a first draft of your 5-page essay on the main themes in "To Kill a Mockingbird". Focus on character development and symbolism. A works cited page is not required for the draft.',
    feedback: null
  },
  {
    id: '4',
    title: 'Calculus Homework',
    due: 'July 25, 2024',
    status: 'Overdue',
    grade: null,
    instructions: 'Complete problems 1-15 from section 2.5 of the textbook.',
    feedback: null
  },
];
