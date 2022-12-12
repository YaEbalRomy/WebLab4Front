import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import TextInput from "../../../stories/TextInput";
import {FormControl, InputLabel, MenuItem, Select, Slider} from "@mui/material";
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import CustomButton from "../../../stories/CustomButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import Fade from "@mui/material/Fade";
import logo from '../../../assets/img/angry-typing.gif'
import useSound from 'use-sound';
import click from '../../../assets/sound/click.mp3';

const useStyles = makeStyles({
    cardContainer: {
        margin: "25px 0 0 25px",
        width: "430px"
    },
    cardForm: {
        padding: "35px",
        background: "white",
        borderRadius: "25px",
        boxShadow: "0 5px 20px gray"
    }
});

function FormCustom(props) {
    const classes = useStyles()
    const [play] = useSound(click);
    const [cat, setCat] = useState(false)

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function resetFields() {
        props.setY("")
        props.setX("")
        props.setR(1)
    }

    function handleSetPoint() {
        play()
        setCat(true)
        props.setPoints({
            "x": Number(props.x),
            "y": Number(props.y),
            "r": Number(props.r),
        })
        sleep(500).then(() => {
            setCat(false)
        })
    }

    return (
        <div className={classes.cardContainer}>
            <Fade in={true} timeout={750}>
                <div className={classes.cardForm}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{width: "175px", height: 60}}>
                            <TextInput type={"number"} min={-5} max={5} help={"Y должен быть от -5 до 5"}
                                       value={props.y} setValue={props.setY} label={"Y"}/>
                        </div>
                        <FormControl size={"small"} sx={{width: "150px", borderColor: "red !important"}}>
                            <InputLabel>X</InputLabel>
                            <Select value={props.x} onChange={(e) => props.setX(e.target.value)} label="X">
                                <MenuItem value={-5}>-5</MenuItem>
                                <MenuItem value={-4}>-4</MenuItem>
                                <MenuItem value={-3}>-3</MenuItem>
                                <MenuItem value={-2}>-2</MenuItem>
                                <MenuItem value={-1}>-1</MenuItem>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{marginTop: 16}}>
                        <Typography style={{color: "rgba(0, 0, 0, 0.6)"}} id="slider" gutterBottom>
                            R: <span style={{color: "black"}}>{props.r}</span>
                        </Typography>
                        <Slider
                            sx={{color: "rgba(255, 0, 0, 0.8)"}}
                            size={"small"}
                            value={props.r}
                            min={1}
                            step={0.5}
                            max={5}
                            onChange={(e) => props.setR(e.target.value)}
                            valueLabelDisplay="auto"
                            aria-labelledby="slider"
                        />
                    </div>
                    <div style={{marginTop: 16, display: "flex", justifyContent: "flex-end"}}>
                        <CustomButton
                            disabled={(props.x === "" || props.y === "") || !(props.y > -5 && props.y < 5)}
                            p={8} icon={<SendIcon/>} action={handleSetPoint} title={"Отправить"}/>
                        <CustomButton action={resetFields} p={8} icon={<RefreshIcon/>} title={"Сбросить"}/>
                    </div>
                </div>
            </Fade>
            <div style={{marginLeft: 25}}>
                <Fade in={cat} timeout={200}>
                    <img src={logo} alt={"cat"}/>
                </Fade>
            </div>

        </div>
    );
}

export default FormCustom;