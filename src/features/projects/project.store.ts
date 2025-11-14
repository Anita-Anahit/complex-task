import { create } from "zustand";
import { v4 as uuid } from "uuid";
import type {Project, ProjectStore} from "../../types/domain.ts";
import { seedProjects } from "../../utils/seed";

const STORAGE_KEY = "taskforge-projects";

const loadProjects = (): Project[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored) as Project[];
        } catch {
            console.error("Invalid project data in localStorage, resetting...");
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects));
    return seedProjects;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: loadProjects(),

    addProject: (title, description) => {
        const newProject: Project = {
            id: uuid(),
            title,
            description,
            tasks: [],
        };
        const updated = [...get().projects, newProject];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ projects: updated });
    },
    updateTask: (projectId, taskId, title, dueDate, status) => {
        const updatedProjects = get().projects.map((p) =>
            p.id === projectId
                ? {
                    ...p,
                    tasks: p.tasks.map((t) =>
                        t.id === taskId
                            ? { ...t, title, dueDate, status }
                            : t
                    ),
                }
                : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
        set({ projects: updatedProjects });
    },

    addTask: (projectId, title, dueDate, status) => {
        const updatedProjects = get().projects.map((p) =>
            p.id === projectId
                ? {
                    ...p,
                    tasks: [
                        ...p.tasks,
                        {
                            id: uuid(),
                            title,
                            dueDate,
                            status,
                        },
                    ],
                }
                : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
        set({ projects: updatedProjects });
    },

    updateTaskStatus: (projectId, taskId, newStatus) => {
        const updatedProjects = get().projects.map((p) =>
            p.id === projectId
                ? {
                    ...p,
                    tasks: p.tasks.map((t) =>
                        t.id === taskId ? { ...t, status: newStatus } : t
                    ),
                }
                : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
        set({ projects: updatedProjects });
    },
}));
