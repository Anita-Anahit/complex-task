export interface Task {
    id: string;
    title: string;
    status: "todo" | "in-progress" | "done";
    dueDate: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tasks: Task[];
}

export interface ProjectStore {
    projects: Project[];
    addProject: (title: string, description: string) => void;
    addTask: (
        projectId: string,
        title: string,
        dueDate: string,
        status: "todo" | "in-progress" | "done"
    ) => void;
    updateTask: (
        projectId: string,
        taskId: string,
        title: string,
        dueDate: string,
        status: "todo" | "in-progress" | "done"
    ) => void;
    updateTaskStatus?: (
        projectId: string,
        taskId: string,
        status: "todo" | "in-progress" | "done"
    ) => void;
}
