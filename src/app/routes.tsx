import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import { useAuthStore } from "../features/auth/auth.store";
import { Layout } from "../components/Layout";

const DashboardPage = lazy(() => import("../features/projects/DashboardPage"));
const ProjectPage = lazy(() => import("../features/projects/ProjectPage"));

export const AppRoutes: React.FC = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <Suspense fallback={<div>Loading dashboard...</div>}>
                                <DashboardPage />
                            </Suspense>
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/project/:id"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <Suspense fallback={<div>Loading project...</div>}>
                                <ProjectPage />
                            </Suspense>
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
    );
};
