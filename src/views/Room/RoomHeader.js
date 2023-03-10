import React, {useEffect, useState} from 'react';
import Avatar from "../../components/avatar";
import {useSelector} from "react-redux";
import userIcon from "../../images/maleAvatar.png"

const RoomHeader = ({users}) => {

    const [isOnline, setIsOnline] = useState(false)
    const authUser = useSelector(state => state.items.user)
    const {onlineUsers} = useSelector(state => state.items)
    users = users.filter(user => user.id !== authUser.id)
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

    useEffect(() => {
        if (user) {
            setIsOnline(onlineUsers.includes(user.id))
        }
    }, [])

    return (
        <div className='roomHeader'>
            <div className="blocks">
                <div>
                    <Avatar
                        isOnline={isOnline}
                        image={user.avatar || userIcon}
                    />
                    <p>{user.firstName + " " + user.lastName}{user.id === authUser.id && (' (you)')}</p>
                </div>
            </div>
            <div className="blocks">
                <div className="settings">
                    <button className="btn-nobg">
                        <i className="fa fa-cog"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomHeader;