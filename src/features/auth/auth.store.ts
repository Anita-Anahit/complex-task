import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
    isAuthenticated: localStorage.getItem("session")==null,
    login: () => set({ isAuthenticated: true }),
    logout: () => {
        localStorage.removeItem("session");
        set({ isAuthenticated: false });
    },
}));
