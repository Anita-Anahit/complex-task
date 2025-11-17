import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {

    const saved = localStorage.getItem("auth-info");
    const isLoggedIn = !!saved;

    return {
        isAuthenticated: isLoggedIn,

        login: (email: string, password: string) => {
            localStorage.setItem("auth-info", email + " " + password);
            set({ isAuthenticated: true });
        },

        logout: () => {
            localStorage.removeItem("auth-info");
            set({ isAuthenticated: false });
        },
    };
});
