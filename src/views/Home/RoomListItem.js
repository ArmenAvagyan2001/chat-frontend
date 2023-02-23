import React from 'react';
import Avatar from "../../components/avatar";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import userIcon from "../../images/maleAvatar.png"

const RoomListItem = ({room, animationDelay}) => {

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const authUser = useSelector(state => state.items.user)
    let users = room.users.filter(user => user.id !== authUser.id)
    let user;

    if (!users.length) {
        user = authUser
    }

    if (users.length === 1) {
        user = users[0]
    }

    if (users.length > 1) {
        console.log('????')
    }

    const handleRoomShow = () => {
        navigate('rooms/' + room.id)
    }

    return (
        <div
            className={`roomItem ${pathname === '/rooms/' + room.id && 'active'}`}
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={handleRoomShow}
        >
            <Avatar
                image={user.avatar || userIcon}
                isOnline={false}
            />
            <div className="userMeta">
                <p>{user.firstName + " " + user.lastName}{user.id === authUser.id && (' (you)')}</p>
                <span className="activeTime">32 minuts ago</span>
            </div>
        </div>
    );
};

export default RoomListItem;