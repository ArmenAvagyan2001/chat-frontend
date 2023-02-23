import React, {useState} from 'react';
import {useSelector} from "react-redux";
import userIcon from "../../images/maleAvatar.png"

const UserProfile = () => {

    const {user} = useSelector(state => state.items)
    const [openSettings, setOpenSettings] = useState(false)

    const handleOpenSettings = () => {
        setOpenSettings(!openSettings)
    }

    return (
        <div className='userProfile'>
            <div className="profile_card user_profile_image">
                <div className="profile_image">
                    <img src={user.avatar || userIcon} />
                </div>
                <h4>Fernando Faucho</h4>
            </div>
            <div className="profile_card">
                <div className="card_header">
                    <h4>Settings</h4>
                    <i className={`fa fa-angle-down ${openSettings && 'active'}`} onClick={handleOpenSettings}></i>
                </div>
                <div className={`card_content ${openSettings && 'active'}`}>
                    <button className="btn">
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;