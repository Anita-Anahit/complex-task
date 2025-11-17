import React, { useMemo, useState, useCallback } from "react";
import styled from "@emotion/styled";
import {
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProjectStore } from "./project.store";
import { TaskListItem } from "../../components/TaskListItem";


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
    font-size: 28px;
    font-weight: 700;
`;

const FilterRow = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
`;

const EmptyState = styled.p`
    opacity: 0.6;
    margin-top: 16px;
`;


interface TaskInputs {
    title: string;
    dueDate: string;
    status: "todo" | "in-progress" | "done";
}

const schema = yup.object({
    title: yup.string().required("Task title is required"),
    dueDate: yup.string().required("Due date is required"),
    status: yup.string().required("Status is required"),
});


const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const projects = useProjectStore((s) => s.projects);
    const addTask = useProjectStore((s) => s.addTask);
    const updateTask = useProjectStore((s) => s.updateTask);

    const project = projects.find((p) => p.id === id);

    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("none");
    const [open, setOpen] = useState(false);
    const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { control, handleSubmit, reset } = useForm<TaskInputs>({
        resolver: yupResolver(schema),
    });


    const onSubmit = useCallback(
        (data: TaskInputs) => {
            try {
                if (!id) return;
                if (!editTaskId) {
                    addTask(id, data.title, data.dueDate, data.status);
                } else {
                    updateTask(id, editTaskId, data.title, data.dueDate, data.status);
                }

                reset();
                setOpen(false);
                setEditTaskId(null);
            } catch (e) {
                console.error(e);
                setError("Unable to save task. Please try again.");
            }
        },
        [id, editTaskId, addTask, updateTask, reset]
    );


    const filteredTasks = useMemo(() => {
        if (!project) return [];

        let tasks = [...project.tasks];

        if (filter !== "all") {
            tasks = tasks.filter((t) => t.status === filter);
        }

        if (sort === "date") {
            tasks.sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
        }

        return tasks;
    }, [project, filter, sort]);


    const handleEdit = useCallback(
        (task: any) => {
            setEditTaskId(task.id);
            reset({
                title: task.title,
                dueDate: task.dueDate,
                status: task.status,
            });
            setOpen(true);
        },
        [reset]
    );

    if (!project)
        return <PageWrapper><EmptyState>Project not found.</EmptyState></PageWrapper>;

    // ------------------- RENDER -------------------

    return (
        <PageWrapper>

            <HeaderRow>
                <Title>{project.title}</Title>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    + New Task
                </Button>
            </HeaderRow>

            <FilterRow>
                <FormControl size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filter}
                        label="Status"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Sort</InputLabel>
                    <Select
                        value={sort}
                        label="Sort"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="date">By Due Date</MenuItem>
                    </Select>
                </FormControl>
            </FilterRow>

            {filteredTasks.length === 0 ? (
                <EmptyState>No tasks available.</EmptyState>
            ) : (
                filteredTasks.map((t) => (
                    <TaskListItem
                        key={t.id}
                        title={t.title}
                        dueDate={t.dueDate}
                        status={t.status}
                        onEdit={() => handleEdit(t)}
                    />
                ))
            )}

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditTaskId(null);
                }}
            >
                <DialogTitle>{editTaskId ? "Edit Task" : "New Task"}</DialogTitle>
                <DialogContent>
                    <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Task Title"
                                    fullWidth
                                    margin="dense"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    type="date"
                                    label="Due Date"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth margin="dense">
                                    <InputLabel>Status</InputLabel>
                                    <Select {...field} label="Status">
                                        <MenuItem value="todo">To Do</MenuItem>
                                        <MenuItem value="in-progress">In Progress</MenuItem>
                                        <MenuItem value="done">Done</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            setEditTaskId(null);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button form="task-form" type="submit" variant="contained">
                        {editTaskId ? "Save Changes" : "Add Task"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
        </PageWrapper>
    );
};

export default ProjectPage;
