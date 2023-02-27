import React, {useEffect, useRef, useState} from 'react';
import RoomList from "./RoomList";
import UserProfile from "./UserProfile";
import {Outlet} from "react-router-dom";
import {io} from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import $api from "../../http";
import {setOnlineUsers} from "../../redux/actions/actions";

const Home = () => {
    const socket = useRef(io(process.env.REACT_APP_API_URL))
    const authUser = useSelector(state => state.items.user)
    const [rooms, setRooms] = useState([])
    const dispatch = useDispatch()

    const getRooms = () => {
        $api.get('/api/rooms')
            .then(res => {
                setRooms(res.data)
            })
    }

    useEffect(() => {
        socket.current.emit('add-user', authUser.id)
        global.socket = socket
    }, [])

    useEffect(() => {
        getRooms()
    }, [])

    useEffect(() => {
        socket.current.on('get-online-users', (onlineUsers) => {
            dispatch(setOnlineUsers(onlineUsers))
        })
    }, [])

    useEffect(() => {
        socket.current.on('set-messages-count', (id) => {
            console.log(id)
            if (rooms.find(room => room.id === id)) {
                setRooms(prev =>
                    prev.map(room => {
                        if (room.id === id) {
                            return {...room, newMessagesCount: room.newMessagesCount + 1, updatedAt: new Date()}
                        }
                        return room
                    })
                )
            } else {
                getRooms()
            }
        })
    }, [])

    return (
        <div className='home'>
            <RoomList rooms={rooms} setRooms={setRooms} />
            <Outlet/>
            <UserProfile/>
        </div>
    );
};

export default Home;