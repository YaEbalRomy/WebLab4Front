import React from 'react';
import TopNavigation from "./TopNavigation";

function Layout(props) {
    return (
        <div>
            <TopNavigation logout={props.logout}/>
            <div style={{background:"whitesmoke"}}>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;