import { AppBar, Toolbar, Typography, Switch, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import { useThemeContext } from "../contexts/ThemeContext";
import { useAuthStore } from "../features/auth/auth.store";

const Root = styled(Box)` width: 100%; `;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { mode, toggleTheme } = useThemeContext();
    const logout = useAuthStore((s) => s.logout);

    return (
        <Root>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">TaskForge</Typography>
                    <Switch checked={mode === "dark"} onChange={toggleTheme} />
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box>{children}</Box>
        </Root>
    );
};
