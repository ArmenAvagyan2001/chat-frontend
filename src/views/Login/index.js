import React, {useState} from 'react';
import InputCustom from "../../components/customs/InputCustom";
import ButtonCustom from "../../components/customs/ButtonCustom";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import $api from "../../http";
import {login} from "../../redux/actions/actions";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    // error messages
    const [emailErrMessage, setEmailErrMessage] = useState(null)
    const [passwordErrMessage, setPasswordErrMessage] = useState(null)
    const [errMessage, setErrMessage] = useState(null)
    const dispatch = useDispatch()

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleLogInClick = () => {
        setLoading(true)
        $api.post('/api/login', {email, password})
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.accessToken)
                dispatch(login(res.data.user))
            })
            .catch(({response}) => {
                setErrMessage(response.data.message)
                setEmailErrMessage(response.data.errors?.context?.key === 'email' ? response.data.errors?.message : null)
                setPasswordErrMessage(response.data.errors?.context?.key === 'password' ? response.data.errors?.message : null)
            }).finally(() => {
                setLoading(false)
        })
    }

    return (
        <section className='login'>
            <div className='component'>
                <div className='icon'>

                </div>
                <div className='login_form'>
                    <p className={errMessage ? 'error_message' : ''}>{errMessage}</p>
                    <InputCustom
                        id='login_email'
                        label='E-Mail Address'
                        error={emailErrMessage}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <br/><br/>
                    <InputCustom
                        id='login_password'
                        label='Password'
                        error={passwordErrMessage}
                        type='password'
                        button={true}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br/><br/>
                    {email.length >=5 && password.length >= 6 && email.match(emailRegex)
                        ? <ButtonCustom text='Log In'
                                        cursor='pointer'
                                        onClick={handleLogInClick}
                                        loading={loading}
                        />
                        : <ButtonCustom text='Log In'
                                        backgroundColor='#b2dffc'

                        />
                    }

                    <br/>
                    <div className='or'>
                        <hr/>
                        <p>OR</p>
                    </div>
                    <div className='forgotPassword'>
                        <Link to='/forgot-password' >Forgot password ?</Link>
                    </div>
                    <div className='registration'>
                        Don't have an account yet? <Link to='/registration'>Registration</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
