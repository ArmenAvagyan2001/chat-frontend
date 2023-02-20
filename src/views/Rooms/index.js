import React, {useEffect, useRef, useState} from 'react';
import $api from "../../http";
import Room from "./Room";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";

const Rooms = () => {

    const authUser = useSelector(state => state.items.user)
    const [rooms, setRooms] = useState([])
    const socket = useRef(io('http://localhost:5000'))

    useEffect(() => {
        $api.get('/api/rooms').then(res => {
            setRooms(res.data)
        })
    }, [])

    useEffect(() => {
        socket.current.emit('add-user', authUser.id)
    }, [])

    return (
        <div className='rooms'>
            {rooms.map((room) => {
                return <Room key={room.id} room={room}/>
            })}
        </div>
    );
};

export default Rooms;