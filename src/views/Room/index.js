import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../http";
import SendMessageForm from "./SendMessageForm";
import Message from "./Message";
import {io} from 'socket.io-client'
import {useSelector} from "react-redux";
import Typing from "./Typing";

const Room = () => {

    const authUser = useSelector(state => state.items.user)
    const socket = useRef(io('http://localhost:5000'))
    const ref = useRef(null);
    const params = useParams()
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [limit] = useState(20)
    const [showPaginationButton, setShowPaginationButton] = useState(true)
    const [loading, setLoading] = useState(false)

    const sortMessages = (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
    }

    const getMessages = (scroll) => {
        setLoading(true)
        $api.get('/api/rooms/' + params.id + '?page=' + page + '&limit=' + limit)
            .then(res => {
                setUsers(res.data.users)
                setMessages([...res.data.messages, ...messages])
                if (res.data.messages.length < limit) {
                    setShowPaginationButton(false)
                }
                setPage( page + 1)
                if (scroll) {
                    setTimeout(() => ref.current?.scrollIntoView(), 0)
                }
            }).finally(() => {
                setLoading(false)
        })
    }

    const backNavigate = () => {
        navigate(-1)
    }

    useEffect(() => {
        getMessages(true)
    }, [])

    useEffect(() => {
        socket.current.emit('add-user', authUser.id)
    }, [])

    useEffect(() => {
        socket.current.on('message-receive', (message) => {
            setMessages(prev => [...prev, message])
            setTimeout(() => ref.current?.scrollIntoView({behavior: 'smooth'}), 0)

        })
    }, [])


    return (
        <div className='authLayout'>
            <div>
                <div className='header'>
                    <div className="icon">
                        <i className='fa fa-arrow-left' onClick={backNavigate} />
                    </div>
                    <div className="settings">

                    </div>
                </div>
                <div className='room'>
                    <div className='messages'>
                        {!loading && showPaginationButton && <div className='pagination' onClick={() => getMessages(false)}>get more messages</div>}
                        {messages.sort(sortMessages).map((message, index) => {
                            return <Message key={index} message={message} />
                        })}
                        <div ref={ref}/>
                    </div>
                    <Typing socket={socket} />
                    <SendMessageForm roomId={params.id} socket={socket} users={users} setMessages={setMessages} current={ref.current} />
                </div>
            </div>

        </div>

    );
};

export default Room;