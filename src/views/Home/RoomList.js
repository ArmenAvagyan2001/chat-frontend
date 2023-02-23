import React, {useEffect, useState} from 'react';
import $api from "../../http";
import RoomListItem from "./RoomListItem";

const RoomList = () => {

    const [rooms, setRooms] = useState([])

    const getRooms = () => {
        $api.get('/api/rooms')
            .then(res => {
                setRooms(res.data)
            })
    }

    useEffect(() => {
        getRooms()
    }, [])

    return (
        <div className='roomList'>
            <button className="btn">
                <i className="fa fa-plus"></i>
                <span>New room</span>
            </button>
            <div className="roomListHeading">
                <h2>Rooms</h2>
                <button>
                    <i className="fa fa-ellipsis-h"></i>
                </button>
            </div>
            <div className="roomListSearch">
                <div>
                    <input type="text" placeholder="Search Here" required />
                    <button className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="roomListItems">
                {rooms.map((room, index) =>
                    <RoomListItem
                        room={room}
                        key={room.id}
                        animationDelay={index + 1}
                    />
                )}
            </div>
        </div>
    );
};

export default RoomList;