import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import DashboardPage from "../features/projects/DashboardPage";
import ProjectPage from "../features/projects/ProjectPage";
import { useAuthStore } from "../features/auth/auth.store";

export const AppRoutes = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
            />
            <Route
                path="/project/:id"
                element={isAuthenticated ? <ProjectPage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
