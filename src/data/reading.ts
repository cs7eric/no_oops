// Define types for our reading content
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  status: "reading" | "completed" | "want-to-read";
  rating?: number;
  startDate?: string;
  endDate?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Thought {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

// Sample data - in a real app this would come from an API or local storage
export const books: Book[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "completed",
    rating: 5,
    startDate: "2025-01-15",
    endDate: "2025-02-20"
  },
  {
    id: "2",
    title: "Design Patterns",
    author: "Gang of Four",
    status: "reading",
    startDate: "2025-03-01"
  },
  {
    id: "3",
    title: "Refactoring",
    author: "Martin Fowler",
    status: "want-to-read"
  }
];

export const notes: Note[] = [
  {
    id: "1",
    title: "JavaScript Closures",
    content: "Closures are functions that have access to variables from their outer scope even after the outer function has returned.",
    date: "2025-03-15",
    tags: ["JavaScript", "Concepts"]
  },
  {
    id: "2",
    title: "React Hooks Best Practices",
    content: "Always use hooks at the top level of your React function components. Don't call hooks inside loops, conditions, or nested functions.",
    date: "2025-03-10",
    tags: ["React", "Hooks", "Best Practices"]
  }
];

export const thoughts: Thought[] = [
  {
    id: "1",
    title: "The Importance of Code Reviews",
    content: "Code reviews are essential for maintaining code quality and knowledge sharing within teams. They help catch bugs early and ensure consistency across the codebase.",
    date: "2025-03-05",
    category: "Software Engineering"
  },
  {
    id: "2",
    title: "Balancing Technical Debt",
    content: "Technical debt is inevitable in software development. The key is to acknowledge it, document it, and plan for its repayment rather than ignoring it completely.",
    date: "2025-02-28",
    category: "Project Management"
  }
];