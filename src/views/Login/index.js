import React, {useRef, useState} from 'react';
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
    const passwordRef = useRef(null)

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleShowPassword = () => {
        const ref = passwordRef.current
        if (ref.type === 'password') {
            ref.type = 'text'
        } else {
            ref.type = 'password'
        }
    }
    const handleLogInClick = () => {
        setLoading(true)
        $api.post('/api/login', {email, password})
            .then(res => {
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
                    <img src={require('../../images/logo.png')} alt="logo" draggable={false}/>
                </div>
                <div className='login_form'>
                    <p className={errMessage ? 'error_message' : ''}>{errMessage}</p>
                   <div className='custom_input'>
                       <input
                           type="text"
                           placeholder={'Email'}
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                       />
                   </div>
                    <span>{emailErrMessage}</span>
                    <br/><br/>
                    <div className='custom_input'>
                        <input
                            type="password"
                            ref={passwordRef}
                            placeholder={'Password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button style={{color: '#4664ff'}} onClick={handleShowPassword}>
                            <i className="fa fa-eye"></i>
                        </button>
                    </div>
                    <span>{passwordErrMessage}</span>
                    <br/><br/>
                    <button className='btn'
                            onClick={handleLogInClick}
                            style={{width:'100%'}} disabled={!(email.length >=5 && password.length >= 6 && email.match(emailRegex))}
                    >
                        {loading && (
                            <i>
                                <i  className='fa fa-circle-o-notch fa-spin'></i>
                            </i>
                        )} <span>Let's go</span>
                   </button>
                    <br/>
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
