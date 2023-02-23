import React from 'react';
import RoomListItem from "./RoomListItem";

const RoomList = ({rooms = [], setRooms}) => {

    const sortRooms = (a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    }

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
                    <input type="text" placeholder="Search Here" required/>
                    <button className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="roomListItems">
                {rooms.sort(sortRooms).map((room, index) =>
                    <RoomListItem
                        room={room}
                        key={room.id}
                        animationDelay={index + 1}
                        setRooms={setRooms}
                    />
                )}
            </div>
        </div>
    );
};

export default RoomList;