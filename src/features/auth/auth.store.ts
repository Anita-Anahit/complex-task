import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem("session"),
    login: (email, password) => {
        localStorage.setItem("session", "true");
        localStorage.setItem("user", email + " " + password);
        set({ isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem("session");
        localStorage.removeItem("user");
        set({ isAuthenticated: false });
    }
}));
