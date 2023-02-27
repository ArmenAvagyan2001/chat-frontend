import React, {useEffect, useState} from 'react';
import RoomListItem from "./RoomListItem";
import $api from "../../http";
import SearchedUser from "./SearchedUser";

const RoomList = ({rooms = [], setRooms}) => {

    const [searchedUsers, setSearchedUsers] = useState([])
    const [search, setSearch] = useState('')

    const sortRooms = (a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search) {
            $api.get('/api/users/' + search)
                .then(res => {
                    setSearchedUsers(res.data)
                })
        } else {
            setSearchedUsers([])
        }
    }, [search])

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
                    <input
                        type="text"
                        placeholder="Search Here"
                        value={search}
                        onChange={handleChange}
                    />
                    <button className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="roomListItems">
                {searchedUsers.length || search
                    ? <>
                        {searchedUsers.map((user, index) =>
                            <SearchedUser user={user}
                                          key={user.id}
                                          animationDelay={index + 1}
                                          setRooms={setRooms}
                                          setSearchedUsers={setSearchedUsers}
                                          setSearch={setSearch}
                            />
                        )}
                    </>
                    : <>
                        {rooms.sort(sortRooms).map((room, index) =>
                            <RoomListItem
                                room={room}
                                key={room.id}
                                animationDelay={index + 1}
                                setRooms={setRooms}
                            />
                        )}
                    </>}

            </div>
        </div>
    );
};

export default RoomList;