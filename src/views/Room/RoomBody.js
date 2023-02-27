import React, {useEffect, useRef, useState} from 'react';
import RoomBodyItem from "./RoomBodyItem";
import $api from "../../http";
import useScroll from "../../hooks/useScroll";

const RoomBody = ({messages = [], scrollRef, roomId, setMessages}) => {

    const childRef = useRef();
    const parentRef = useRef();
    useScroll(parentRef, childRef, getMessages)
    const [showChildren, setShowChildren] = useState(false)
    const [page, setPage] = useState(1)

    const sortMessages = (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
    }

    function getMessages () {
        setPage(prevState => prevState + 1)
    }


    useEffect(() => {
        if (showChildren) {
            setShowChildren(false)
            $api.get(`/api/rooms/${roomId}?page=${page}&limit=20`)
                .then(res => {
                    setMessages([...res.data.messages, ...messages])
                    console.log(res.data)
                    if (res.data.messages.length < 20) {
                        setShowChildren(false)
                    } else {
                        setShowChildren(true)
                    }
                })
        }
    }, [page])


    useEffect(() => {
        if (messages.length) {
            scrollRef?.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])

    useEffect(() => {
        setTimeout(() => setShowChildren(true), 500)
    }, [])

    return (
        <div className='roomBody' ref={parentRef}>
            {showChildren && <div ref={childRef} />}
            <div className="chat__items">
                {messages.sort(sortMessages).map((message, index) => {
                    return (
                       <RoomBodyItem
                           key={index}
                           animationDelay={index + 1}
                           message={message}
                       />
                    );
                })}
                <div ref={scrollRef} />
            </div>
        </div>
    );
};

export default RoomBody;