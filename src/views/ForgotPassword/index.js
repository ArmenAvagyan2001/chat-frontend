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
                    <img src={require('../../images/logo.png')} alt="logo" draggable={false}/>
                </div>
                <div className='forgot_form'>
                    {successMessage
                        ? <SuccessMessages message={successMessage}/>
                        : <>
                            <div className="custom_input">
                                <input type="text"
                                       value={email}
                                       placeholder='Email'
                                       onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <span>{errMessage}</span>
                            <br/><br/>
                            <button className='btn'
                                    style={{width: '100%'}}
                                    onClick={handleForgotPasswordClick}
                                    disabled={!(email.match(emailRegex))}
                            >
                                {loading && (
                                    <i>
                                        <i  className='fa fa-circle-o-notch fa-spin'></i>
                                    </i>
                                )}
                                <span>Let's Go</span>
                            </button>
                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
