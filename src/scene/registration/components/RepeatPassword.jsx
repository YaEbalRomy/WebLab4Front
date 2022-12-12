import React, {useState} from 'react';
import {Icon} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {withStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";

const TextInputCustom = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'gray',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'red',
        }
    },
})(TextField);

function RepeatPassword(props) {
    const [type, setType] = useState("password")

    return (
        <div style={{padding: props?.p}}>
            <TextInputCustom type={type} error={props.value !== props.prevPassword && props.value}
                             helperText={(props.value !== props.prevPassword && props.value !== "")  ? "Пароли должны совпадать" : null}
                             variant={"standard"} style={{border: 'none'}}
                             value={props.value} fullWidth
                             onChange={(e) => props.setValue(e.target.value)}
                             label={"Подтверждение пароля"}
                             InputProps={{
                                 endAdornment: props.value && <Icon onClick={() =>
                                     setType(type === "password" ? "text" : "password")
                                 } style={{marginRight: 10, cursor: "pointer", color: "gray"}}>
                                     {type === "text" ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                 </Icon>
                             }}>
            </TextInputCustom>
        </div>
    );
}

export default RepeatPassword;