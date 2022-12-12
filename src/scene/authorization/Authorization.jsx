import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade"
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextInput from "../../stories/TextInput";
import CustomButton from "../../stories/CustomButton";
import Layout from "../../layout/Layout";
import {checkAuthorization} from "../../service/functions/validation";
import {connect} from "react-redux";
import {login, setRedirect} from "../../service/reducer/actions";

const useStyles = makeStyles({
    mainBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 60px)",
    },
    formBox: {
        paddingTop: "48px",
        width: "425px",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px gray",
    }
});

function Authorization(props) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const classes = useStyles()
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null || localStorage.getItem("refreshToken") !== null) {
            navigate("/main")
        }
    }, [])

    useEffect(() => {
        if (props.isRedirect) {
            localStorage.setItem("user", login)
            navigate("/main")
            props.setRedirect()
        }
    }, [props.isRedirect])

    function loginHandler() {
        props.login({
            "username": login,
            "password": password
        })
    }

    return (
        <Layout>
            <div className={classes.mainBox}>
                <Fade in={true} timeout={750}>
                    <div className={classes.formBox}>
                        <Typography align={"center"} style={{fontWeight: "bold", fontSize: 22, marginTop: 16}}>Добро
                            пожаловать</Typography>
                        <div style={{height: 80}}>
                            <TextInput min={6} max={20}
                                       help={"Логин должен быть от 6 до 20 символов латинскими буквами"}
                                       p={16} value={login} setValue={setLogin} type={"text"} label={"Логин"}/>
                        </div>
                        <div style={{height: 80}}>
                            <TextInput password min={6} max={20}
                                       help={"Пароль должен быть от 6 до 20 символов латинскими буквами"}
                                       p={16} value={password} setValue={setPassword} type={"password"}
                                       label={"Пароль"}/>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-end", marginTop: 16}}>
                            <CustomButton p={8} disabled={checkAuthorization(login, password)}
                                          action={loginHandler}
                                          icon={<LoginIcon/>} title={"Войти"}/>
                            <CustomButton p={8} icon={<PersonAddIcon/>} title={"Регистрация"}
                                          action={() => navigate("/registration")}/>
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
    login,
    setRedirect
})(Authorization);