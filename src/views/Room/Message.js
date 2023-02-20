import React from 'react';
import {useSelector} from "react-redux";

const Message = ({message}) => {

    const {user} = useSelector(state => state.items)

    return (
        <div className={`message-component ${user.id === message.sender._id ? "sender" : "host"}`}>
            <div>
                <div>
                    <img src={message.sender.avatar || require('../../images/maleAvatar.png')} alt="avatar"/>
                </div>
                <div>
                    <p>{message.message}</p>
                </div>

            </div>
        </div>
    );
};

export default Message;