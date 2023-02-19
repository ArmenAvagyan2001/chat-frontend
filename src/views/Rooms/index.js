import React, {useEffect, useState} from 'react';
import $api from "../../http";
import Room from "./Room";

const Rooms = () => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        $api.get('/api/rooms').then(res => {
            setRooms(res.data)
        })
    }, [])

    return (
        <div className='rooms'>
            {rooms.map((room) => {
                return <Room key={room.id} room={room}/>
            })}
        </div>
    );
};

export default Rooms;