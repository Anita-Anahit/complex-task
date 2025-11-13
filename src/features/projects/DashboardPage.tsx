import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProjectStore } from "./project.store";
import { ProjectCard } from "../../components/ProjectCard";
import { mockApi } from "../../utils/api";
import { seedProjects } from "../../utils/seed";

interface FormInputs {
    title: string;
    description: string;
}

const schema = yup.object({
    title: yup.string().required("Project title is required"),
    description: yup.string().required("Description is required"),
});

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { projects, addProject } = useProjectStore();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { control, handleSubmit, reset } = useForm<FormInputs>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        mockApi.getProjects().then((data: any) => {
            if (Array.isArray(data) && data.length === 0) {
                localStorage.setItem("taskforge-projects", JSON.stringify(seedProjects));
            }
            setLoading(false);
        });
    }, []);

    const onSubmit = (data: FormInputs) => {
        addProject(data.title, data.description);
        setOpen(false);
        reset();
    };

    if (loading)
        return (
            <Box p={6} display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>
        );

    return (
        <Box p={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Projects
                </Typography>
                <Box>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        + Add Project
                    </Button>
                </Box>
            </Box>

            {projects.length === 0 ? (
                <Typography>No projects yet. Create one to get started!</Typography>
            ) : (
                <Grid container spacing={3}>
                    {projects.map((p) => (
                        <Grid item xs={12} sm={6} md={4} key={p.id}>
                            <ProjectCard
                                title={p.title}
                                description={p.description}
                                taskCount={p.tasks.length}
                                onClick={() => navigate(`/project/${p.id}`)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Project</DialogTitle>
                <DialogContent>
                    <form id="project-form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Project Title"
                                    fullWidth
                                    margin="dense"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    fullWidth
                                    margin="dense"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" form="project-form" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DashboardPage;
