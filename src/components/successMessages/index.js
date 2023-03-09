import React from 'react';
import ButtonCustom from "../customs/ButtonCustom";
import {useNavigate} from 'react-router-dom'

const SuccessMessages = ({message}) => {

    const navigate = useNavigate()

    return (
        <div className='success_messages'>
            <p className='message'>
                {message}
            </p>
            <br/><br/>
            <button className='btn'
                    style={{width: '100%'}}
                    onClick={() => navigate('/login')}
            >
                <span>Go Next</span>
            </button>
        </div>
    );
};

export default SuccessMessages;
