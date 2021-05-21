import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

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
        <>
        <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
            <ul className="profile-dropdown">
                <li>{user.username}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
            )}
        </>
    );
}

export default ProfileButton;
