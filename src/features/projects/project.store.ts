import { create } from "zustand";
import { v4 as uuid } from "uuid";
import type {Project, ProjectStore} from "../../types/domain";
import { seedProjects } from "../../utils/seed";

const STORAGE_KEY = "taskforge-projects";

const loadProjects = (): Project[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects));
        return seedProjects;
    }
    try {
        return JSON.parse(raw) as Project[];
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects));
        return seedProjects;
    }
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: loadProjects(),

    addProject: (title, description) => {
        const newProject: Project = { id: uuid(), title, description, tasks: [] };
        const updated = [...get().projects, newProject];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ projects: updated });
    },

    addTask: (projectId, title, dueDate, status) => {
        const updated = get().projects.map((p) =>
            p.id === projectId ? { ...p, tasks: [...p.tasks, { id: uuid(), title, dueDate, status }] } : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ projects: updated });
    },

    updateTask: (projectId, taskId, title, dueDate, status) => {
        const updated = get().projects.map((p) =>
            p.id === projectId
                ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, title, dueDate, status } : t)) }
                : p
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ projects: updated });
    },
}));
