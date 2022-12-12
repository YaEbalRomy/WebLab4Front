import {
    DELETE_ALL,
    FAILED,
    GET_DATA,
    LOGIN,
    LOGOUT,
    REGISTRATION,
    SET_POINT,
    SET_REDIRECT,
    SUCCESS
} from "./const";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const DEFAULT_STATE = {
    data: [],
    isRedirect: false
}

export default function reducer(state = DEFAULT_STATE, action) {
    let type = action.type
    let payload = action.payload

    switch (type) {
        case SUCCESS + GET_DATA:
            return {
                ...state,
                data: payload,
            }

        case FAILED + GET_DATA:
            toast.error("Не удалось получить данные")
            return {
                ...state
            }

        case SUCCESS + LOGIN:
            toast.success("Авторизация прошла успешно")
            localStorage.setItem("accessToken", payload.accessToken)
            localStorage.setItem("refreshToken", payload.refreshToken)

            return {
                ...state,
                isRedirect: true
            }

        case FAILED + LOGIN:
            toast.error(payload.message)
            return {
                ...state,
                isRedirect: false
            }

        case SUCCESS + REGISTRATION:
            toast.success(payload.message)
            return {
                ...state,
                isRedirect: true
            }

        case FAILED + REGISTRATION:
            toast.error(payload.message)
            return {
                ...state,
                isRedirect: false
            }

        case SUCCESS + SET_POINT:
            return {
                ...state,
                data: [...state.data, payload],
            }

        case FAILED + SET_POINT:
            toast.error("Не удалось отправить значение")
            return {
                ...state,
            }

        case SUCCESS + DELETE_ALL:
            toast.success(payload.message)
            return {
                ...state,
                data: [],
            }

        case FAILED + DELETE_ALL:
            toast.error("Не удалось удалить данные")
            return {
                ...state
            }

        case SET_REDIRECT:
            return {
                ...state,
                isRedirect: false
            }


        default:
            return state
    }
}