import React, {useState} from 'react';
import InputCustom from "../../components/customs/InputCustom";
import ButtonCustom from "../../components/customs/ButtonCustom";
import $api from "../../http";
import SuccessMessages from "../../components/successMessages";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)

    const [errMessage, setErrMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleForgotPasswordClick = () => {
        setLoading(true)
        $api.post('/api/forgot-password', {email})
            .then(res => {
                setSuccessMessage(res.data.message)
            }).catch(({response}) => {
            setErrMessage(response.data.message || response.data.errors?.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <section className='forgot_password'>
            <div className='component'>
                <div className='icon'>

                </div>
                <div className='forgot_form'>
                    {successMessage
                        ? <SuccessMessages message={successMessage}/>
                        : <>
                            <InputCustom
                                id='forgot_email'
                                label='Enter You E-Mail Address'
                                error={errMessage}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br/>
                            {email.match(emailRegex)
                                ? <ButtonCustom
                                    text="Let's Go"
                                    loading={loading}
                                    cursor='pointer'
                                    onClick={handleForgotPasswordClick}
                                />
                                : <ButtonCustom
                                    text='Log In'
                                    backgroundColor='#b2dffc'
                                />
                            }
                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
