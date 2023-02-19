import React from 'react';
import {Outlet} from 'react-router-dom'
import Header from "../header";

const AuthLayout = () => {
    return (
        <div className='authLayout'>
            <div>
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;