import React, {useEffect, useState} from 'react';

const Typing = ({socket}) => {

    const [typing, setTyping] = useState(false)
    const [writer, setWriter] = useState({})

    useEffect(() => {
        socket.current.on('user-typing', (data) => {
            setWriter(data)
            setTyping(true)
        })

        socket.current.on('user-stopped-typing', () => {
            setTyping(false)
        })
    })

    return (
        <div className={`typing ${typing && 'active'}`}>
            <img src={writer.avatar || require('../../images/maleAvatar.png')} alt="avatar"/>
            <p>typing....</p>
        </div>
    );
};

export default Typing;