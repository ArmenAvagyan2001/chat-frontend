import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import userIcon from "../../images/maleAvatar.png"
import $api from "../../http";
import {setUser} from "../../redux/actions/actions";

const ModalPersonalInformation = ({active, setActive}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.items)
    const [avatar, setAvatar] = useState(null)
    const [data, setData] = useState({
        firstName: user.firstName,
        lastName: user.lastName
    })

    const handleClose = () => {
        setActive(false)
    }

    const handleChangeData = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0])
    }

    const handleUpdateSubmit = () => {
        const FData = new FormData()
        FData.append('firstName', data.firstName)
        FData.append('lastName', data.lastName)
        if (avatar) {
            FData.append('avatar', avatar)
        }

        $api.put('/api/users', FData)
            .then(res => {
                dispatch(setUser(res.data))
                setActive(false)
            }).catch(({response}) => {
            console.log(response)
        })
    }

    return (
        <div className={`modal ${active && 'active'}`}>
            <div className={`modal-content ${active && 'active'}`}>
                <div className='closeModalButton' onClick={handleClose}>
                    <i className='fa fa-close'/>
                </div>
                <br/>
                <div className='modalPersonalInformation'>
                    <div className='user-avatar'>
                        <button className='edit'>
                            <i className="material-icons">delete</i>
                        </button>
                        <button>
                            <label htmlFor="file">
                                <i className="material-icons">edit</i>
                            </label>
                        </button>
                        <input type="file" id='file' onChange={handleAvatarChange} />
                        <div className='user-avatar-img'>
                            <img src={(avatar && URL.createObjectURL(avatar)) || user.avatar || userIcon} alt="avatar"/>
                        </div>
                    </div><br/>
                    <div className='information'>
                        <input type="text" name='firstName' value={data.firstName} onChange={handleChangeData}/>
                    </div><br/>
                    <div className='information'>
                        <input type="text" name='lastName' value={data.lastName} onChange={handleChangeData}/>
                    </div>
                    <br/>
                    <button className="btn" onClick={handleUpdateSubmit}>
                        <span>Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalPersonalInformation;