import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Room = ({room}) => {

    const authUser = useSelector(state => state.items.user)
    let users = room.users.filter(user => user.id !== authUser.id)
    const navigate = useNavigate()

    if (!users.length) {
        users = room.users.filter(user => user.id === authUser.id)
        users.length = 1
    }

    const handleShowRoomClick = () => {
        navigate("/room/" + room.id)
    }

    return (
        <div className='room-component' onClick={handleShowRoomClick}>
            {
                users.length && users.length < 2
                    ? <>
                        <div>
                            <img src={users[0].avatar || require("../../images/maleAvatar.png")} alt="avatar"/>
                        </div>
                        <div>
                            {users[0].firstName + " " + users[0].lastName}
                            {authUser.id === users[0].id && <p>(You)</p>}
                        </div>
                        <div className='settings'>
                            <button>
                                <i className="fa fa-ellipsis-h"></i>
                            </button>
                        </div>
                    </>
                    : <></>
            }

        </div>
    );
};

export default Room;