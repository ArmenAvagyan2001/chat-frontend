import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import InputCustom from "../../components/customs/InputCustom";
import ButtonCustom from "../../components/customs/ButtonCustom";
import $api from "../../http";
import SuccessMessages from "../../components/successMessages";

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errMessage, setErrMessage] = useState(null)

    const {pathname} = useLocation()

    const handleResetPasswordClick = () => {
        $api.post(`/api${pathname}`, {password, confirm_password})
            .then(res => {
                setSuccessMessage(res.data.message)
            }).catch(({response}) => {
            setErrMessage(response.data.message || response.data.errors?.message)
        })
    }

    return (
        <section className='reset_password'>
            <div className='component'>
                <div className='icon'>
                </div>
                <div className='reset_form'>
                    {successMessage
                        ? <SuccessMessages message={successMessage}/>
                        : <>
                            <p className={errMessage ? 'error_message' : ''}>{errMessage}</p>
                            <InputCustom
                                id='reset_password'
                                button={true}
                                label='Enter New Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br/><br/>
                            <InputCustom
                                id='reset_confirm_password'
                                button={true}
                                label='Confirm Password'
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <br/><br/>
                            {password.length >= 6 && confirm_password.length >= 6
                                ? <ButtonCustom text="Let's Go"
                                                cursor='pointer'
                                                onClick={handleResetPasswordClick}/>
                                : <ButtonCustom text='Log In'
                                                backgroundColor='#b2dffc'
                                />}
                        </>}

                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
