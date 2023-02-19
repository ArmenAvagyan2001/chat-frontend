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
                socket.current.emit('send-message', {message: res.data, to: allUsers[0].id})
                setTimeout(() => current?.scrollIntoView({behavior: 'smooth'}), 0)
            })
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className='sendMessageForm'>
            <button onClick={handleSendMessage}>
                <i className="fa fa-send"></i>
            </button>
            <textarea value={message} onChange={handleChange} />
        </div>
    );
};

export default SendMessageForm;