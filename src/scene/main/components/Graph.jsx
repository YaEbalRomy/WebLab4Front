import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Slide} from "@mui/material";
import Fade from "@mui/material/Fade";
import logo from "../../../assets/img/angry-typing.gif";
import useSound from "use-sound";
import click from "../../../assets/sound/click.mp3";
import {sleep} from "../../../service/functions/util";


const useStyles = makeStyles({
    cardContainer: {
        margin: "25px 0 0 25px",
        width: "430px"
    },
    cardGraph: {
        background: "white",
        borderRadius: "25px",
        boxShadow: "0 15px 40px gray"
    },
    graph: {
        margin: "15px",
        cursor: "pointer"
    },
    figure: {
        transition: "0.3s",
        "&:hover": {
            fill: "rgba(255, 0, 0, 0.4)",
            transition: "0.3s"
        }
    }
});


function Graph(props) {
    const classes = useStyles()
    const [play] = useSound(click);
    const [cat, setCat] = useState(false)

    function shot(e) {
        const elem = document.getElementById("graph")
        let point = elem.getBoundingClientRect();
        let xVal = e.clientX - point.left
        let yVal = e.clientY - point.top
        let x = (((xVal - 200) * props.r) / 140).toFixed(1)
        let y = (((200 - yVal) * props.r) / 140).toFixed(1)
        play()
        setCat(true)
        const body = {
            "x": Number(x),
            "y": Number(y),
            "r": props.r
        }
        props.setPoints(body)
        sleep(500).then(() => {
            setCat(false)
        })
    }

    return (
        <div className={classes.cardContainer}>
            <Slide in={true} direction={"right"} timeout={500}>
                <div className={classes.cardGraph}>
                    <svg id={"graph"} className={classes.graph} width="400" height="400" onClick={(e) => shot(e)}>
                        <line x1="0" x2="400" y1="200" y2="200" stroke="black"/>
                        <text x="385" y="185">X</text>
                        <polygon points="400,200 385,206 385,194" stroke="black"/>
                        <line x1="270" x2="270" y1="207" y2="193" stroke="black"/>
                        <text x="260" y="185">{props.r}/2</text>
                        <line x1="340" x2="340" y1="207" y2="193" stroke="black"/>
                        <text x="335" y="185">{props.r}</text>
                        <line x1="130" x2="130" y1="207" y2="193" stroke="black"/>
                        <text x="120" y="185">{props.r}/2</text>
                        <line x1="60" x2="60" y1="207" y2="193" stroke="black"/>
                        <text x="55" y="185">{props.r}</text>
                        <line x1="200" x2="200" y1="0" y2="400" stroke="black"/>
                        <text x="215" y="15">Y</text>
                        <polygon points="200,0 194,15 206,15" stroke="black"/>
                        <line x1="207" x2="193" y1="270" y2="270" stroke="black"/>
                        <text x="215" y="275">{props.r}/2</text>
                        <line x1="207" x2="193" y1="340" y2="340" stroke="black"/>
                        <text x="215" y="345">{props.r}</text>
                        <line x1="207" x2="193" y1="130" y2="130" stroke="black"/>
                        <text x="215" y="135">{props.r}/2</text>
                        <line x1="207" x2="193" y1="60" y2="60" stroke="black"/>
                        <text x="215" y="65">{props.r}</text>
                        <rect className={classes.figure} x="200" y="60" height="140" width="140" fill="red"
                              fill-opacity="0.1"
                              stroke="red"></rect>
                        <polygon className={classes.figure} points="200,340 60,200 200,200" fill="red" fill-opacity="0.3"
                                 stroke="red"></polygon>
                        <path className={classes.figure}  d="M200 200 L 270 200 C 270 200 270 270 200 270" fill-opacity="0.2"
                              stroke="red" fill="red"></path>
                        {props.data?.map((el) =>
                            <Fade in={true} timeout={200}>
                                <circle r="3" cx={el.x * 140 / el.r + 200}
                                        cy={el.y * -140 / el.r + 200} fill={el.hit ? "red" : "whitesmoke"}
                                        stroke={el.hit ? "firebrick" : "gray"}/>
                            </Fade>
                        )}
                    </svg>
                </div>
            </Slide>
            <div style={{marginLeft: 25}}>
                <Fade in={cat} timeout={200}>
                    <img src={logo} alt={"cat"}/>
                </Fade>
            </div>
        </div>
    );
}

export default Graph;