import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "../contexts/ThemeContext.tsx";
import { AppRoutes } from "./routes.tsx";
import { Layout } from "../components/Layout.tsx";

export const App = () => {
    return (
        <ThemeContextProvider>
            <BrowserRouter>
                <Layout>
                    <AppRoutes />
                </Layout>
            </BrowserRouter>
        </ThemeContextProvider>
    );
};
