import React, {useState} from 'react';
import $api from "../../http";
import {useSelector} from "react-redux";

const SendMessageForm = ({roomId, socket, users, setMessages, current}) => {

    const authUser = useSelector(state => state.items.user)
    const [message, setMessage] = useState("")
    let allUsers = users.filter(user => user.id !== authUser.id)

    if (!allUsers.length) {
        allUsers = users.filter(user => user.id === authUser.id)
        allUsers.length = 1
    }

    const handleSendMessage = () => {
        setMessage("")
        const data = {
            roomId,
            sender: authUser.id,
            message
        }
        $api.post('/api/messages', data)
            .then(res => {
                setMessages(prev => [...prev, res.data])
                socket.current.emit('send-message', {message: res.data, users: allUsers})
                setTimeout(() => current?.scrollIntoView({behavior: 'smooth'}), 0)
            })
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = () => {
        socket.current.emit('typing', {isTyping: true, users: allUsers, writer: authUser})
    }

    const handleKeyUp = () => {
        socket.current.emit('typing', {isTyping: false, users: allUsers, writer: authUser})
    }

    return (
        <div className='sendMessageForm'>
            {!!message.length && (
                <button onClick={handleSendMessage}>
                    <i className="fa fa-send"></i>
                </button>
            )}
            <textarea value={message}
                      onChange={handleChange}
                      placeholder='Message...'
                      onKeyDown={handleKeyDown}
                      onKeyUp={handleKeyUp}
            />
        </div>
    );
};

export default SendMessageForm;