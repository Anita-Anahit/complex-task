import type {Project} from "../types/domain.ts";

export const mockApi = {
    getProjects: (): Promise<Project[]> =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem("taskforge-projects") || "[]"));
            }, 500);
        }),

    saveProjects: (projects: Project[]): Promise<boolean> =>
        new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem("taskforge-projects", JSON.stringify(projects));
                resolve(true);
            }, 300);
        }),
};