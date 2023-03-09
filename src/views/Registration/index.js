import React, {useRef, useState} from 'react';
import InputCustom from "../../components/customs/InputCustom";
import ButtonCustom from "../../components/customs/ButtonCustom";
import $api from "../../http";
import SuccessMessages from "../../components/successMessages";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    // errors
    const [emailErr, setEmailErr] = useState(null)
    const [passwordErr, setPasswordErr] = useState(null)
    const [lastNameErr, setLastNameErr] = useState(null)
    const [firstNameErr, setFirstNameErr] = useState(null)

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const passwordRef = useRef(null)

    const handleRegistrationClick = () => {
        setLoading(true)
        $api.post('/api/registration', {email, password, lastName, firstName})
            .then(res => {
                setSuccessMessage(res.data.message)
            }).catch(({response}) => {
            setEmailErr( response.data.errors?.context?.key === 'email' ? response.data.errors.message : response.data.message.includes('email') ? response.data.message : null)
            setPasswordErr(response.data.errors?.context?.key === 'password' ? response.data.errors.message : null)
            setFirstNameErr(response.data.errors?.context?.key === 'firstName' ? response.data.errors.message : null)
            setLastNameErr(response.data.errors?.context?.key === 'lastName' ? response.data.errors.message : null)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleShowPassword = () => {
        const ref = passwordRef.current
        if (ref.type === 'password') {
            ref.type = 'text'
        } else {
            ref.type = 'password'
        }
    }

    return (
        <section className='register'>
            <div className='component'>
                <div className='icon'>
                    <img src={require('../../images/logo.png')} alt="logo" draggable={false}/>
                </div>
                <div className='register_form'>
                    {successMessage
                        ? <SuccessMessages message={successMessage}/>
                        : <>
                            <div className='custom_input'>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder='Email'
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <span>{emailErr}</span>
                            <br/><br/>
                            <div className='custom_input'>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder='Password'
                                    onChange={e => setPassword(e.target.value)}
                                    ref={passwordRef}
                                />
                                <button style={{color: '#4664ff'}} onClick={handleShowPassword}>
                                    <i className="fa fa-eye"></i>
                                </button>
                            </div>
                            <span>{passwordErr}</span>
                            <br/><br/>
                            <div className='custom_input'>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder='First Name'
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <span>{firstNameErr}</span>
                            <br/><br/>
                            <div className='custom_input'>
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder='Last Name'
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <span>{lastNameErr}</span>
                            <br/><br/>
                            <button className='btn'
                                    style={{width: "100%"}}
                                    onClick={handleRegistrationClick}
                                    disabled={!(email.match(emailRegex) && password.length >= 6 && firstName.length >= 2 && lastName.length >= 2)}
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

export default Register;
