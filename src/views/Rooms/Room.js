import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import ModalDeleteRoom from "./ModalDeleteRoom";

const Room = ({room}) => {

    const authUser = useSelector(state => state.items.user)
    let users = room.users.filter(user => user.id !== authUser.id)
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

    if (!users.length) {
        users = room.users.filter(user => user.id === authUser.id)
        users.length = 1
    }

    const handleShowRoomClick = () => {
        navigate("/room/" + room.id)
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setOpenModal(true)
    }


    return (
        <>
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
                                <div>
                                    {!!room.newMessagesCount && room.newMessagesCount}
                                </div>
                                <button>
                                    <i className="fa fa-trash" onClick={handleDeleteClick}></i>
                                </button>
                            </div>
                        </>
                        : <></>
                }
            </div>
            <ModalDeleteRoom active={openModal} setActive={setOpenModal} />
        </>
    );
};

export default Room;