import React from 'react';
import Avatar from "../../components/avatar";
import userIcon from "../../images/maleAvatar.png"
import {useSelector} from "react-redux";
import moment from "moment";

const RoomBodyItem = ({animationDelay, message}) => {

    const authUser = useSelector(state => state.items.user)

    return (
        <div className={`roomItem ${authUser.id !== message.sender._id && 'other'}`} style={{animationDelay: `0.${animationDelay}s`}}>
            <div className="room_item_content">
                <div className="room_msg">{message.message}</div>
                <div className="room_meta">
                    <span>{moment(message.createdAt).fromNow()}</span>
                    <span>{moment(message.createdAt).format('LT')}</span>
                </div>
            </div>
            <Avatar isOnline="active" image={message.sender.avatar || userIcon} />
        </div>
    );
};

export default RoomBodyItem;