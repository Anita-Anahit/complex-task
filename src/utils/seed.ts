import { v4 as uuid } from "uuid";

export const seedProjects = [
    {
        id: uuid(),
        title: "Website Redesign",
        description: "Update UI components and improve UX for main site.",
        tasks: [
            {
                id: uuid(),
                title: "Create new landing page layout",
                status: "in-progress",
                dueDate: "2025-11-20",
            },
            {
                id: uuid(),
                title: "Revise color palette and typography",
                status: "todo",
                dueDate: "2025-11-25",
            },
        ],
    },
    {
        id: uuid(),
        title: "Marketing Campaign",
        description: "Plan new social media ads for Q4.",
        tasks: [
            {
                id: uuid(),
                title: "Write campaign copy",
                status: "done",
                dueDate: "2025-11-05",
            },
            {
                id: uuid(),
                title: "Design promotional graphics",
                status: "todo",
                dueDate: "2025-11-18",
            },
        ],
    },
];
