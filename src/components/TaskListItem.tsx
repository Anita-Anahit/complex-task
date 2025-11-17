import React, { useCallback } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";

const StyledListItem = styled(ListItem)``;

interface TaskListItemProps {
    title: string;
    status: string;
    dueDate: string;
    onEdit: () => void;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({ title, status, dueDate, onEdit }) => {
    const handleEdit = useCallback(() => onEdit(), [onEdit]);

    return (
        <StyledListItem
            secondaryAction={
                <IconButton edge="end" onClick={handleEdit} aria-label={`edit-${title}`}>
                    <EditIcon />
                </IconButton>
            }
        >
            <ListItemText primary={title} secondary={`Status: ${status} | Due: ${dueDate}`} />
        </StyledListItem>
    );
};

export default TaskListItem;
