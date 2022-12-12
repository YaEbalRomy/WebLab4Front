import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "whitesmoke",
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        padding:10,
        fontSize: 14,
    },
}));