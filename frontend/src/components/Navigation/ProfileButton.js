import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

//When clicked, the profile button should trigger a component state change and cause a dropdown menu to be rendered. When there is a click outside of the dropdown menu list or on the profile button again, then the dropdown menu should disappear.
function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
    };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className="profile_container">
        <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
            <ul className="profile-dropdown">
                <div className="username">
                    <li>{user.username}</li>
                </div>
                <div className="user_email">
                    <li>{user.email}</li>
                </div>
                <li>
                    <button className="logout_btn" onClick={logout}>Log Out</button>
                </li>
            </ul>
            )}
        </div>
    );
}

export default ProfileButton;
