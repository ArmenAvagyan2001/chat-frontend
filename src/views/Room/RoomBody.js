import React, {useEffect} from 'react';
import RoomBodyItem from "./RoomBodyItem";

const RoomBody = ({messages = [], scrollRef}) => {

    const sortMessages = (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
    }

    useEffect(() => {
        if (messages.length) {
            scrollRef?.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])

    return (
        <div className='roomBody'>
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