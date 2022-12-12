import {FAILED, SUCCESS} from "../reducer/const";

function createAction(type, payload) {
    return {
        type: type,
        payload: payload,
    };
}

export function call({type, url, method, body}) {
    return function (dispatch) {
        fetch(url, {// todo check axios
            "method": method,
            "headers": {
                "content-type": "application/json",
                "AccessToken": localStorage.getItem("accessToken"),
                "RefreshToken": localStorage.getItem("refreshToken")
            },
            "body": JSON.stringify(body),
        }).then(response => {
                if (response.status === 200 || response.status === 201) {
                    response.json().then((json => dispatch(createAction(SUCCESS + type, json))))
                } else if (response.status === 500) {
                    dispatch(createAction(FAILED + type, {"message": "Сервер недоступен"}))
                } else if (response.status === 403) {
                    // кинуть на login
                } else response.json().then((err => dispatch(createAction(FAILED + type, err))))
            });
    }
}