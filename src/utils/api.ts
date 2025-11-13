export const mockApi = {
    getProjects: () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem("taskforge-projects") || "[]"));
            }, 500);
        }),

    saveProjects: (projects: any) =>
        new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem("taskforge-projects", JSON.stringify(projects));
                resolve(true);
            }, 300);
        }),
};
