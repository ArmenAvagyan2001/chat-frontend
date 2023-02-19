import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import $api from "../../http";
import {logout} from "../../redux/actions/actions";

const Header = () => {

    const {user} = useSelector(state => state.items)
    const dispatch = useDispatch()

    const handleLogoutClick = () => {
        $api.post('/api/logout').then(() => {
            dispatch(logout())
        })
    }

    return (
        <header className='header'>
            <div className='icon'>
                <img src={user.avatar ? user.avatar : require("../../images/maleAvatar.png")} alt="avatar"/>
            </div>
            <div className='settings'>
                <div>
                    <div className='search'>
                        <Link to='search'>
                            <i className='fa fa-search'></i>
                        </Link>
                    </div>
                    <div className='settings'>
                        <Link to='settings'>
                            <i className="material-icons">settings</i>
                        </Link>
                    </div>
                    <div className='logout'>
                        <Link onClick={handleLogoutClick}>
                            <i className='fa fa-sign-out'></i>
                        </Link>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;