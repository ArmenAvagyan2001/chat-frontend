import React from 'react';
import {useSelector} from "react-redux";

const Message = ({message}) => {

    const {user} = useSelector(state => state.items)

    return (
        <div className={`message-component ${user.id === message.sender._id ? "sender" : "host"}`}>
            <div>
                <img src={message.sender.avatar || require('../../images/maleAvatar.png')} alt="avatar"/>
                <p>{message.message}</p>
            </div>
        </div>
    );
};

export default Message;