/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProjectStore } from "./project.store";
import ProjectCard from "../../components/ProjectCard";
import { mockApi } from "../../utils/api";
import { seedProjects } from "../../utils/seed";

const PageWrapper = styled.div`
    padding: 32px;
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 32px;
    font-weight: 700;
`;

const GridContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const EmptyState = styled.p`
    font-size: 18px;
    opacity: 0.7;
`;

const LoadingWrapper = styled.div`
    padding: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
    const projects = useProjectStore((s) => s.projects);
    const addProject = useProjectStore((s) => s.addProject);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { control, handleSubmit, reset } = useForm<FormInputs>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        mockApi
            .getProjects()
            .then((data) => {
                if (Array.isArray(data) && data.length === 0) {
                    mockApi
                        .saveProjects(seedProjects)
                        .then(() => setLoading(false))
                        .catch(() => setLoading(false));
                } else {
                    setLoading(false);
                }
            })
            .catch(() => {
                setError("Failed to load projects. Please try again.");
                setLoading(false);
            });
    }, []);

    const onSubmit = useCallback(
        (data: FormInputs) => {
            try {
                addProject(data.title, data.description);
                setOpen(false);
                reset();
            } catch (e) {
                console.error(e);
                setError("Unable to create project. Please try again.");
            }
        },
        [addProject, reset]
    );

    if (loading)
        return (
            <LoadingWrapper>
                <CircularProgress />
            </LoadingWrapper>
        );

    return (
        <PageWrapper>
            <HeaderRow>
                <Title>Projects</Title>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    + Add Project
                </Button>
            </HeaderRow>

            {projects.length === 0 ? (
                <EmptyState>No projects yet. Create one to get started!</EmptyState>
            ) : (
                <GridContainer>
                    {projects.map((p) => (
                        <ProjectCard
                            key={p.id}
                            title={p.title}
                            description={p.description}
                            taskCount={p.tasks.length}
                            onClick={() => navigate(`/project/${p.id}`)}
                        />
                    ))}
                </GridContainer>
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
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
        </PageWrapper>
    );
};

export default DashboardPage;
