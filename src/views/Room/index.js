import React, {useEffect, useRef, useState} from 'react';
import $api from "../../http";
import {useParams} from "react-router-dom";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import RoomFooter from "./RoomFooter";
import {useSelector} from "react-redux";

const Room = () => {

    const {id: roomId} = useParams()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [limit] = useState(20)
    const scrollRef = useRef()
    const authUser = useSelector(state => state.items.user)
    const [loading, setLoading] = useState(false)

    const getRoom = () => {
        setLoading(true)
        $api.get(`/api/rooms/${roomId}?page=0&limit=${limit}`)
            .then(res => {
                setMessages(res.data.messages)
                setUsers(res.data.users)
            }).finally(() => {
                setLoading(false)
        })
    }

    useEffect(() => {
        if (global.socket) {
            global.socket.current.on('message-receive', (data) => {
                setMessages(prevState => [...prevState, data])
            })
        }
    }, [global.socket])

    useEffect(() => {
        getRoom()
        if (global.socket) {
            global.socket.current.emit('add-room', {userId: authUser.id, roomId})
        }
    },[global.socket, roomId])

    return (
        <div className='room'>
            {loading
                ? <>

                </>
                : <>
                    <RoomHeader users={users} />
                    <RoomBody messages={messages} setMessages={setMessages} scrollRef={scrollRef} roomId={roomId}/>
                    <RoomFooter scrollRef={scrollRef} setMessages={setMessages} users={users} />
                </>
            }

        </div>
    );
};

export default Room;