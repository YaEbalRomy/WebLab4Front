import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Authorization from "../../scene/authorization/Authorization";
import Main from "../../scene/main/Main";
import Registration from "../../scene/registration/Registration";


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;