import React, { Suspense} from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "../contexts/ThemeContext";
import { AppRoutes } from "./routes";

export const App: React.FC = () => (
    <ThemeContextProvider>
        <BrowserRouter basename={"/complex-task"}>
            <Suspense fallback={<div>Loading app...</div>}>
                <AppRoutes />
            </Suspense>
        </BrowserRouter>
    </ThemeContextProvider>
);

export default App;