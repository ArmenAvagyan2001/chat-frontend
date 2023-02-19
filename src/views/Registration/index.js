import React, {useState} from 'react';
import InputCustom from "../../components/customs/InputCustom";
import ButtonCustom from "../../components/customs/ButtonCustom";
import $api from "../../http";
import SuccessMessages from "../../components/successMessages";

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    // errors
    const [emailErr, setEmailErr] = useState(null)
    const [passwordErr, setPasswordErr] = useState(null)
    const [lastNameErr, setLastNameErr] = useState(null)
    const [firstNameErr, setFirstNameErr] = useState(null)

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleRegistrationClick = () => {
        setLoading(true)
        $api.post('/api/registration', {email, password, lastName, firstName, gender})
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

    return (
        <section className='register'>
            <div className='component'>
                <div className='icon'>

                </div>
                <div className='register_form'>
                    {successMessage
                        ? <SuccessMessages message={successMessage}/>
                        : <>
                            <InputCustom
                                id='register_email'
                                label='E-Mail Address'
                                error={emailErr}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <br/><br/>
                            <InputCustom
                                id='register_password'
                                label='Password'
                                error={passwordErr}
                                type='password'
                                button={true}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <br/><br/>
                            <InputCustom
                                id='register_first_name'
                                label='First Name'
                                error={firstNameErr}
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <br/><br/>
                            <InputCustom
                                id='register_last_name'
                                label='Last Name'
                                error={lastNameErr}
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <br/><br/>
                            <select value={gender} onChange={e => setGender(e.target.value)}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            <br/><br/>
                            {email.match(emailRegex) && password.length >= 6 && firstName.length >= 2 && lastName.length >= 2
                                ? <ButtonCustom
                                    text="Let's Go"
                                    cursor='pointer'
                                    loading={loading}
                                    onClick={handleRegistrationClick}
                                />
                                : <ButtonCustom
                                    text="Let's Go"
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

export default Register;
