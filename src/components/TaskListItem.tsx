import { ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface TaskListItemProps {
    title: string;
    status: string;
    dueDate: string;
    onEdit: () => void;
}

export const TaskListItem = ({ title, status, dueDate, onEdit }: TaskListItemProps) => (
    <ListItem
        secondaryAction={
            <IconButton edge="end" onClick={onEdit}>
                <EditIcon />
            </IconButton>
        }
    >
        <ListItemText primary={title} secondary={`Status: ${status} | Due: ${dueDate}`} />
    </ListItem>
);
