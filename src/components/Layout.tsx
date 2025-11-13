import {type ReactNode, useEffect} from "react";
import { AppBar, Toolbar, Typography, Switch, Button, Box } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import {useAuthStore} from "../features/auth/auth.store.ts";


interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { mode, toggleTheme } = useThemeContext();
    const { logout } = useAuthStore();

    useEffect(() => {
        const logoutButton = document.getElementById("log-out");
        logoutButton?.click();
    }, []);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">TaskForge</Typography>
                    <Switch checked={mode === "dark"} onChange={toggleTheme} />
                    <Button id="root-logout-button" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Box>{children}</Box>
        </Box>
    );
};
