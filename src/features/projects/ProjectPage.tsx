import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProjectStore } from "./project.store";
import { TaskListItem } from "../../components/TaskListItem";

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
    const { projects, addTask } = useProjectStore();
    const project = projects.find((p) => p.id === id);

    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("none");
    const [open, setOpen] = useState(false);

    const { control, handleSubmit, reset } = useForm<TaskInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: TaskInputs) => {
        if (id) addTask(id, data.title, data.dueDate, data.status);
        reset();
        setOpen(false);
    };

    const filteredTasks = useMemo(() => {
        if (!project) return [];
        let tasks = [...project.tasks];
        if (filter !== "all") tasks = tasks.filter((t) => t.status === filter);
        if (sort === "date") tasks.sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
        return tasks;
    }, [project, filter, sort]);

    if (!project) return <Typography p={4}>Project not found.</Typography>;

    return (
        <Box p={4}>
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h4">{project.title}</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    + New Task
                </Button>
            </Box>

            <Box display="flex" gap={2} mb={2}>
                <FormControl size="small">
                    <InputLabel>Status</InputLabel>
                    <Select value={filter} label="Status" onChange={(e) => setFilter(e.target.value)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Sort</InputLabel>
                    <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value)}>
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="date">By Due Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {filteredTasks.length === 0 ? (
                <Typography color="text.secondary">No tasks available.</Typography>
            ) : (
                filteredTasks.map((t) => (
                    <TaskListItem
                        key={t.id}
                        title={t.title}
                        dueDate={t.dueDate}
                        status={t.status}
                        onEdit={() => alert("Edit feature not implemented yet")}
                    />
                ))
            )}

            {/* Add Task Modal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Task</DialogTitle>
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
                                    fullWidth
                                    margin="dense"
                                    label="Due Date"
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button form="task-form" type="submit" variant="contained">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectPage;
