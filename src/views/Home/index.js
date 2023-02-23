import React, {useEffect, useRef} from 'react';
import RoomList from "./RoomList";
import UserProfile from "./UserProfile";
import {Outlet} from "react-router-dom";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";

const Home = () => {
    const socket = useRef(io(process.env.REACT_APP_API_URL))
    const authUser = useSelector(state => state.items.user)

    useEffect(() => {
        socket.current.emit('add-user', authUser.id)
    }, [])

    return (
        <div className='home'>
            <RoomList />
            <Outlet />
            <UserProfile/>
        </div>
    );
};

export default Home;