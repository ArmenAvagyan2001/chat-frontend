import React from 'react';
import {useSelector} from "react-redux";
import $api from "../../http";
import {useNavigate} from "react-router-dom";

const User = ({user}) => {

    const authUser = useSelector(state => state.items.user)
    const navigate = useNavigate()

    const handleCreateRoomClick = () => {
        const data = {
            users: [authUser.id, user.id]
        }

        $api.post('/api/rooms', data)
            .then(res => {
                navigate('/room/' + res.data.id)
            })
    }

    return (
        <div className='user'>
            <div>
                <img src={user.avatar || require("../../images/maleAvatar.png")} alt="avatar"/>
            </div>
            <div>
                {user.firstName + " " + user.lastName}
                {authUser.id === user.id && <p>(You)</p>}
            </div>
            <div className='settings'>
                <button onClick={handleCreateRoomClick}>
                    <i className="fa fa-wechat"></i>
                </button>
            </div>
        </div>
    );
};

export default User;