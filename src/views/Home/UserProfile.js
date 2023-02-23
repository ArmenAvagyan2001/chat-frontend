import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import userIcon from "../../images/maleAvatar.png"
import $api from "../../http";
import {logout} from "../../redux/actions/actions";

const UserProfile = () => {

    const {user} = useSelector(state => state.items)
    const [openSettings, setOpenSettings] = useState(false)
    const dispatch = useDispatch()

    const handleOpenSettings = () => {
        setOpenSettings(!openSettings)
    }

    const handleLogOutClick = () => {
        $api.post('/api/logout')
            .then(() => {
                dispatch(logout())
            })
    }


    return (
        <div className='userProfile'>
            <div className="profile_card user_profile_image">
                <div className="profile_image">
                    <img src={user.avatar || userIcon} />
                </div>
                <br/>
                <h4>{user.firstName} {user.lastName}</h4>
            </div>
            <div className="profile_card">
                <div className="card_header">
                    <h4>Settings</h4>
                    <i className={`fa fa-angle-down ${openSettings && 'active'}`} onClick={handleOpenSettings}></i>
                </div>
                <div className={`card_content ${openSettings && 'active'}`}>
                    <button className="btn" onClick={handleLogOutClick}>
                        <i className="fa fa-sign-out"></i>
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;