import React from 'react';
import Header from "./components/Header";
import {makeStyles} from "@mui/styles";
import CustomButton from "../stories/CustomButton";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    header: {
        background: "#F62817",
        height: "60px",
        width: "100%",
    },
    headerContainer: {
        padding: "10px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 125px",
    }
})

function TopNavigation(props) {
    const navigate = useNavigate();
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <div className={classes.headerContainer}>
                <div>
                    <Header label={"Афанасьев Даниил Олегович P32311"}/>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Header label={"Вариант № 757"}/>
                    {props.logout &&
                        <div style={{marginRight: 10}}>
                            <Header label={localStorage.getItem("user")}/>
                        </div>
                    }
                </div>
                <div>
                    {props.logout &&
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <CustomButton logout={props.logout} icon={<LogoutIcon/>} title={"Выход"}
                                          action={() => {
                                              localStorage.clear()
                                              navigate("/login")
                                          }}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default TopNavigation;