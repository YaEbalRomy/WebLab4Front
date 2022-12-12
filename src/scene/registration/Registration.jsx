import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextInput from "../../stories/TextInput";
import CustomButton from "../../stories/CustomButton";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Layout from "../../layout/Layout";
import {checkRegistration} from "../../service/functions/validation";
import {connect} from "react-redux";
import {registration, setRedirect} from "../../service/reducer/actions";
import RepeatPassword from "./components/RepeatPassword";

const useStyles = makeStyles({
    mainBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 60px)"
    },
    formBox: {
        width: "425px",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px gray",
    }
})

function Registration(props) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const classes = useStyles()
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isRedirect) {
            navigate("/login")
            props.setRedirect()
        }
    }, [props.isRedirect])

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null || localStorage.getItem("refreshToken") !== null) {
            navigate("/main")
        }
    }, [])

    function handleRegistration() {
        props.registration({
            "username": login,
            "password": password
        })
        setLogin("")
        setPassword("")
        setRepeatPassword("")
    }

    return (
        <Layout>
            <div className={classes.mainBox}>
                <Fade in={true} timeout={750}>
                    <div className={classes.formBox}>
                        <IconButton onClick={() => navigate(-1)}><ArrowBackIosIcon
                            sx={{color: "rgba(255, 0, 0, 0.8)"}}/></IconButton>
                        <Typography align={"center"}
                                    style={{fontWeight: "bold", fontSize: 22, marginTop: 16}}>Регистрация</Typography>
                        <div style={{height: 80}}>
                            <TextInput min={6} max={20}
                                       help={"Логин должен быть от 6 до 20 символов латинскими буквами"} p={16}
                                       value={login} setValue={setLogin} type={"text"} label={"Логин"}/>
                        </div>
                        <div style={{height: 80}}>
                            <TextInput password min={6} max={20}
                                       help={"Пароль должен быть от 6 до 20 символов латинскими буквами"} p={16}
                                       value={password} setValue={setPassword} type={"password"} label={"Пароль"}/>
                        </div>
                        <div style={{height: 80}}>
                            <RepeatPassword p={16} prevPassword={password} value={repeatPassword}
                                            setValue={setRepeatPassword}/>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-end", marginTop: 8}}>
                            <CustomButton action={handleRegistration}
                                          disabled={checkRegistration(login, password, repeatPassword)} p={8}
                                          icon={<PersonAddIcon/>} title={"Зарегестрироваться"}/>
                        </div>
                    </div>
                </Fade>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps, {
    registration,
    setRedirect
})(Registration);