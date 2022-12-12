import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {makeStyles} from "@mui/styles";
import {IconButton, Slide} from "@mui/material";
import logo from '../../../assets/img/cat-sleep.gif'
import {LightTooltip} from "../../../stories/LightTooltip";
import useSound from "use-sound";
import mur from "../../../assets/sound/mur.mp3";
import RowResult from "./RowResult";
import DeleteIcon from '@mui/icons-material/Delete';
import Fade from "@mui/material/Fade";


const useStyles = makeStyles({
    tableContainer: {
        width: "calc(100vw - 960px)",
        margin: "25px 0 0 25px",
    },
    table: {
        height: "fit-content",
        padding: "35px",
        background: "white",
        borderRadius: "25px",
        boxShadow: "0 5px 20px gray",
    },
    scroll: {
        '&::-webkit-scrollbar': {
            width: "5px",
        },

        "&::-webkit-scrollbar-track": {
            background: "whitesmoke"
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: "5px",
            backgroundColor: "rgba(255, 0, 0, 0.4)"
        }
    }
})

function TableCustom(props) {
    const classes = useStyles()
    const [play, {stop}] = useSound(mur, {volume: 0.5});

    return (
        <div className={classes.tableContainer}>
            <Slide in={true} direction={"left"} timeout={500}>
                <div className={classes.table}>
                    <TableContainer>
                        <div>
                            <Table>
                                <TableRow>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#F62817", width: "15%"}}
                                        align="center">X</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#F62817", width: "15%"}}
                                        align="center">Y</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#F62817", width: "15%"}}
                                        align="center">R</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#F62817", width: "20%"}}
                                        align="center">RESULT</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#F62817", width: "25%"}}
                                        align="center">TIME</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#F62817", width: "10%"}}
                                        align="center">
                                        <LightTooltip placement="top"
                                                      title={"Удалить историю"}><IconButton size={"small"}><DeleteIcon
                                            onClick={() => props.deleteAll()}
                                            sx={{color: "white"}}/></IconButton></LightTooltip></TableCell>
                                </TableRow>
                            </Table>
                        </div>
                        {props.data?.length === 0 ?
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Fade in={true} timeout={500}>
                                    <div>
                                        <LightTooltip title={"Кот спит, ему скучно так как нет данных("}>
                                            <img onMouseEnter={() => play()} onMouseLeave={() => stop()}
                                                 style={{width: 200, height: 200, cursor: 'pointer', marginBottom: 25}}
                                                 src={logo}
                                                 alt="Кот спит, ему скучно так как нет данных("/>
                                        </LightTooltip>
                                    </div>
                                </Fade>
                            </div> :
                            <div className={classes.scroll}
                                 style={{overflowY: 'scroll', maxHeight: 'calc(100vh - 260px)'}}>
                                <Table>
                                    <TableBody>
                                        {props.data?.map((res) => (
                                            <RowResult res={res}/>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        }
                    </TableContainer>
                </div>
            </Slide>
        </div>
    );
}

export default TableCustom;