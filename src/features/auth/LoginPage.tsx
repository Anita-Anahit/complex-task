import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
    email: string;
    password: string;
}

export const validEmailPasswordMap: Record<string, string> = {
    "user1@optimum.com": "user1password",
    "user2@optimum.com": "user2password",
};

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email required"),
    password: yup.string().min(6, "Minimum 6 chars").required("Password required")
}).required();

export const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: LoginFormValues) => {
        if (validEmailPasswordMap.hasOwnProperty(data.email) && validEmailPasswordMap[data.email] === data.password) {
            localStorage.setItem("session", "true");
            localStorage.setItem("user", data.email + " " + data.password);
            navigate("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <Box maxWidth={400} mx="auto" mt={8}>
            <Typography variant="h4" mb={2}>Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal"/>
                <TextField fullWidth label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} margin="normal"/>
                <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
            </form>
        </Box>
    );
};
