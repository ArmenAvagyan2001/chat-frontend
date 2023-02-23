import React, {useEffect, useRef, useState} from 'react';
import Avatar from "../../components/avatar";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import userIcon from "../../images/maleAvatar.png"

const RoomListItem = ({room, animationDelay, setRooms}) => {

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [isOnline, setIsOnline] = useState(false)
    const authUser = useSelector(state => state.items.user)
    const {onlineUsers} = useSelector(state => state.items)
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
        setRooms(prev => prev.map(item => {
            if (item.id === room.id) {
                return {...item, newMessagesCount: 0}
            }

            return item
        }))
    }

    useEffect(() => {
        setIsOnline(onlineUsers.includes(user.id))
    }, [onlineUsers])

    return (
        <div
            className={`roomItem ${pathname === '/rooms/' + room.id && 'active'}`}
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={handleRoomShow}
        >
            <Avatar
                image={user.avatar || userIcon}
                isOnline={authUser.id === user.id || isOnline}
            />
            <div className="userMeta">
                <p>{user.firstName + " " + user.lastName}{user.id === authUser.id && (' (you)')}</p>
                <span className="activeTime">32 minuts ago</span>
                {room.newMessagesCount > 0 && <div className='newMessagesCount'><span>{room.newMessagesCount}</span></div>}
            </div>
        </div>
    );
};

export default RoomListItem;