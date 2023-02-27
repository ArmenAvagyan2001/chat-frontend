import React, {useRef, useState} from 'react';
import logo from '../../images/logo.png'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";

const Navbar = () => {

    const navigate = useNavigate()
    const {user} = useSelector(state => state.items)

    const handleHomeNavigateClick = () => {
        navigate('/')
        global.socket.current.emit('delete-room-connection', user.id)
    }

    return (
        <div className="navbar">
            <div onClick={handleHomeNavigateClick}>
                <img src={logo} alt='logo'></img>
            </div>
            <div className="nav__blocks"></div>
            <div className="nav__blocks"></div>
        </div>
    );
};

export default Navbar;