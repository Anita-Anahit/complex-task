import React, { useCallback } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  height: 100%;
`;

interface ProjectCardProps {
    title: string;
    description: string;
    taskCount: number;
    onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, taskCount, onClick }) => {
    const handleClick = useCallback(() => onClick(), [onClick]);

    return (
        <StyledCard>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2">{description}</Typography>
                    <Typography variant="caption">{taskCount} tasks</Typography>
                </CardContent>
            </CardActionArea>
        </StyledCard>
    );
};

export default ProjectCard;
