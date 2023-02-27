import React, {useEffect, useState} from 'react';
import Avatar from "../../components/avatar";
import userIcon from "../../images/maleAvatar.png"
import {useSelector} from "react-redux";
import moment from "moment";

const RoomBodyItem = ({animationDelay, message}) => {

    const {user, onlineUsers} = useSelector(state => state.items)

    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        setIsOnline(onlineUsers.includes(message.sender._id))
    }, [onlineUsers])

    return (
        <div className={`roomItem ${user.id !== message.sender._id && 'other'}`} style={{animationDelay: `0.${animationDelay}s`}}>
            <div className="room_item_content">
                <div className="room_msg">{message.message}</div>
                <div className="room_meta">
                    <span>{moment(message.createdAt).fromNow()}</span>
                    <span>{moment(message.createdAt).format('LT')}</span>
                </div>
            </div>
            <Avatar isOnline={isOnline} image={message.sender.avatar || userIcon} />
        </div>
    );
};

export default RoomBodyItem;