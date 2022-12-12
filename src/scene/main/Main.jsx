import React, {useEffect, useState} from 'react';
import Graph from "./components/Graph";
import {makeStyles} from "@mui/styles";
import FormCustom from "./components/FormCustom";
import Layout from "../../layout/Layout";
import TableCustom from "./components/TableCustom";
import {connect} from "react-redux";
import {deleteAll, getData, setPoints} from "../../service/reducer/actions";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    mainBox: {
        display: "flex",
        height: "calc(100vh - 60px)"
    },
})

function Main(props) {
    const classes = useStyles()
    const navigate = useNavigate()
    const [y, setY] = useState("")
    const [x, setX] = useState("")
    const [r, setR] = useState(1)

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null || localStorage.getItem("refreshToken") !== null) {
            props.getData()
        }else {
            navigate("/login")
        }
    }, [])

    return (
        <Layout logout>
            <div className={classes.mainBox}>
                <Graph r={r} data={props.data} setPoints={props.setPoints}/>
                <FormCustom y={y} setY={setY} x={x} setX={setX} r={r} setR={setR}
                            setPoints={props.setPoints}/>
                <TableCustom data={props.data} deleteAll={props.deleteAll}/>
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
    getData,
    setPoints,
    deleteAll
})(Main);