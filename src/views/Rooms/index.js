import React, {useEffect, useRef, useState} from 'react';
import $api from "../../http";
import Room from "./Room";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";

const Rooms = () => {

    const authUser = useSelector(state => state.items.user)
    const [rooms, setRooms] = useState([])
    const socket = useRef(io(process.env.REACT_APP_API_URL))

    const sortRooms = (a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    }

    useEffect(() => {
        $api.get('/api/rooms').then(res => {
            setRooms(res.data)
        })
    }, [])

    useEffect(() => {
        socket.current.emit('add-user', authUser.id)
        socket.current.on('message-receive', (message) => {
            setRooms(rooms => {
                return rooms.map(room => {
                    if (room.id === message.roomId) {
                        return {...room, newMessagesCount: room.newMessagesCount + 1, updatedAt: new Date()}
                    }else {
                        return room
                    }
                })
            })

        })
    }, [])

    return (
        <div className='rooms'>
            {rooms.sort(sortRooms).map((room) => {
                return <Room key={room.id} room={room}/>
            })}
        </div>
    );
};

export default Rooms;