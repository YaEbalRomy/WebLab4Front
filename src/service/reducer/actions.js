import {call} from "../functions/call";
import {AUTH, DELETE_ALL, GET_DATA, LOGIN, LOGOUT, REG, REGISTRATION, RESULT, SET_POINT, SET_REDIRECT} from "./const";

export const getData = () => call({
    type: GET_DATA,
    url: RESULT,
    method: "GET",
})

export const setPoints = (body) => call({
    type: SET_POINT,
    url: RESULT,
    method: "POST",
    body
})

export const deleteAll = () => call({
    type: DELETE_ALL,
    url: RESULT,
    method: "DELETE"
})


export const login = (body) => call({
    type: LOGIN,
    url: AUTH,
    method: "POST",
    body
})


export const registration = (body) => call({
    type: REGISTRATION,
    url: REG,
    method: "POST",
    body
})

export const setRedirect = () => ({
    type: SET_REDIRECT
})