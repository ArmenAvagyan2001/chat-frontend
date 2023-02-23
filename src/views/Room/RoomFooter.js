import React, {useRef, useState} from 'react';
import $api from "../../http";
import {useParams} from "react-router-dom";
import {io} from "socket.io-client";
import {useSelector} from "react-redux";

const RoomFooter = ({scrollRef, setMessages, users}) => {

    const {id: roomId} = useParams()
    const [message, setMessage] = useState("")
    const socket = useRef(io(process.env.REACT_APP_API_URL))
    const authUser = useSelector(state => state.items.user)

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        setMessage('')
        e.preventDefault()
        const data = {
            roomId,
            message
        }
        $api.post('/api/messages', data)
            .then(res => {
                setMessages(prev => [...prev, res.data])
                socket.current.emit('send-message', {message: res.data, users: users.filter(user => user.id !== authUser.id)})
                scrollRef.current.scrollIntoView({ behavior: "smooth" });
            })
    }

    return (
        <form className='roomFooter' onSubmit={handleSubmit}>
            <div className="sendNewMessage">
                <button className="addFiles">
                    <i className="fa fa-plus"></i>
                </button>
                <input
                    type="text"
                    placeholder="Type a message here"
                    onChange={handleChange}
                    value={message}
                />
                <button className="btnSendMsg" id="sendMsgBtn">
                    <i className="fa fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};

export default RoomFooter;