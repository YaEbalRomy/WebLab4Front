import React from 'react';
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import cursor from "../assets/cursors/default_pointer.svg";

const useStyles = makeStyles({
    containedRed: {
        backgroundColor: "rgba(255, 0, 0, 0.8) !important",
        "&:hover": {
            backgroundColor: "red !important",
            "@media (hover: none)": {
                backgroundColor: "red !important"
            }
        }
    },
    containedWhitesmoke: {
        color: "red !important",
        backgroundColor: "whitesmoke !important",
        "&:hover": {
            backgroundColor: "white !important",
            "@media (hover: none)": {
                backgroundColor: "white !important"
            }
        }
    }
});

function CustomButton(props) {
    const classes = useStyles()

    return (
        <div style={{padding: props?.p}}>
            <Button
                sx={{cursor: "url(" + cursor + "), auto" }}
                onClick={props?.action}
                    className={props?.disabled ? null : props?.logout ? classes.containedWhitesmoke : classes.containedRed}
                    startIcon={props?.icon}
                    disabled={props?.disabled }
                    variant={"contained"}>{props.title}</Button>
        </div>
    );
}

export default CustomButton;