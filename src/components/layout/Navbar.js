import React from 'react';
import logo from '../../images/logo.png'
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()

    const handleHomeNavigateClick = () => {
        navigate('/')
    }

    return (
        <div className="navbar">
            <div onClick={handleHomeNavigateClick}>
                <img src={logo}></img>
            </div>
            <div className="nav__blocks"></div>
            <div className="nav__blocks"></div>
        </div>
    );
};

export default Navbar;