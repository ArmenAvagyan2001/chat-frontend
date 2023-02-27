import React from 'react';
import Avatar from "../../components/avatar";
import userIcon from "../../images/maleAvatar.png";
import {useSelector} from "react-redux";
import $api from "../../http";
import {useNavigate} from "react-router-dom";

const SearchedUser = ({animationDelay, user, setSearchedUsers, setSearch}) => {

    const authUser = useSelector(state => state.items.user)
    const navigate = useNavigate()

    const handleUserClick = () => {
        const data = {users: [user.id, authUser.id]}
        $api.post('/api/rooms', data)
            .then((res) => {
                navigate('rooms/' + res.data.id)
                setSearchedUsers([])
                setSearch('')
            })
    }

    return (
        <div
            className={`roomItem`}
            style={{ animationDelay: `0.${animationDelay}s` }}
            onClick={handleUserClick}
        >
            <Avatar
                image={user.avatar || userIcon}
                isOnline={false}
            />
            <div className="userMeta">
                <p>{user.firstName + " " + user.lastName}{user.id === authUser.id && (' (you)')}</p>
                <span className="activeTime">{"  "}</span>
            </div>
        </div>
    );
};

export default SearchedUser;