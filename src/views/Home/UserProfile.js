import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import userIcon from "../../images/maleAvatar.png"
import $api from "../../http";
import {logout} from "../../redux/actions/actions";
import ModalPersonalInformation from "./ModalPersonalInformation";

const UserProfile = () => {

    const {user} = useSelector(state => state.items)
    const [openOptions, setOpenOptions] = useState(false)
    const [openPersonalInformation, setOpenPersonalInformation] = useState(false)
    const dispatch = useDispatch()

    const handleOpenOptions = () => {
        setOpenOptions(!openOptions)
    }

    const handleLogOutClick = () => {
        $api.post('/api/logout')
            .then(() => {
                dispatch(logout())
            })
    }

    const handleOpenSettings = () => {
        setOpenPersonalInformation(true)
    }

    return (
        <>
            <div className='userProfile'>
                <div className="profile_card user_profile_image">
                    <div className="profile_image">
                        <img src={user.avatar || userIcon}/>
                    </div>
                    <br/>
                    <h4>{user.firstName} {user.lastName}</h4>
                </div>
                <div className="profile_card">
                    <div className="card_header">
                        <h4>Options</h4>
                        <i className={`fa fa-angle-down ${openOptions && 'active'}`} onClick={handleOpenOptions}></i>
                    </div>
                    <div className={`card_content ${openOptions && 'active'}`}>
                        <button className="btn" onClick={handleOpenSettings}>
                            <i className="material-icons">settings</i>
                            <span>Personal information</span>
                        </button>
                        <button className="btn" onClick={handleLogOutClick}>
                            <i className="fa fa-sign-out"></i>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </div>
            <ModalPersonalInformation active={openPersonalInformation} setActive={setOpenPersonalInformation} />
        </>

    );
};

export default UserProfile;