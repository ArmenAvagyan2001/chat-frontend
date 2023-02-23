import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className='layout'>
            <div className='component'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;