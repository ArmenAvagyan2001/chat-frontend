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
            <ButtonCustom
                text='Go Next'
                onClick={() => navigate('/login')}
            />
        </div>
    );
};

export default SuccessMessages;
