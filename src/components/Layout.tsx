import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Switch, Button, Box } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { mode, toggleTheme } =
       //need to implement
        useThemeContext();

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">TaskForge</Typography>
                    <Switch checked={mode === "dark"} onChange={toggleTheme} />
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <Box>{children}</Box>
        </Box>
    );
};
