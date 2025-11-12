import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

interface ProjectCardProps {
    title: string;
    description: string;
    taskCount: number;
    onClick: () => void;
}

export const ProjectCard = ({ title, description, taskCount, onClick }: ProjectCardProps) => (
    <Card>
        <CardActionArea onClick={onClick}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
                <Typography variant="caption">{taskCount} tasks</Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);
