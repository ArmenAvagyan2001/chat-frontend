import React, {useEffect, useRef, useState} from 'react';
import $api from "../../http";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const RoomFooter = ({scrollRef, setMessages, users}) => {

    const {id: roomId} = useParams()
    const inputRef = useRef(null)
    const [message, setMessage] = useState("")
    const authUser = useSelector(state => state.items.user)
    const [openEmojis, setOpenEmojis] = useState(false)
    const [currentPosition, setCurrentPosition] = useState()

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
                global.socket.current.emit('send-message', {message: res.data, users: users.filter(user => user.id !== authUser.id)})
                scrollRef.current.scrollIntoView({ behavior: "smooth" });
            })
    }

    const handleOpenEmoji = (e) => {
        e.preventDefault()
        e.stopPropagation()
        inputRef.current.focus()
        setOpenEmojis(!openEmojis)
    }

    const handleEmojiSelect = ({native}) => {
        const ref = inputRef.current
        ref.focus()
        const start = message.substring(0, ref.selectionStart)
        const end = message.substring(ref.selectionStart)
        const msg = start + native + end
        setMessage(msg)
        setCurrentPosition(start.length + native.length)
    }

    useEffect(() => {
        inputRef.current.selectionEnd = currentPosition
    }, [currentPosition])

    useEffect(() => {
        document.onclick = () => {
            setOpenEmojis(false)
        }
    }, [])

    return (
        <form className='roomFooter' onSubmit={handleSubmit}>
            <div className={`emoji-layout ${openEmojis && 'active'}`} onClick={e => e.stopPropagation()}>
                <Picker data={data} onEmojiSelect={handleEmojiSelect}/>
            </div>

            <div className="sendNewMessage">
                <button className="addFiles">
                    <i className="fa fa-plus"></i>
                </button>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Type a message here"
                    onChange={handleChange}
                    value={message}
                />
                <button className="btnSendMsg" id='emoji' onClick={handleOpenEmoji}>😀</button>
                <button className="btnSendMsg" id="sendMsgBtn">
                    <i className="fa fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};

export default RoomFooter;