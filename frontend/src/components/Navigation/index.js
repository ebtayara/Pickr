import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

//navigation should render an unordered list with a navigation link to the home page. It should only contain navigation links to the login and signup routes when there is no session user and a logout button when there is.
function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton id="profile_btn" user={sessionUser} />
        );
    } else {
    sessionLinks = (
        <>
            <NavLink to="/login" id="log_in_btn">Log In</NavLink>
            <NavLink to="/signup" id="sign_up_btn">Sign Up</NavLink>
        </>
        );
    }

    return (
    <body>
        <ul id="bar">
            <li>
                <NavLink exact to="/" id="home_btn">pickr</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    </body>
    );
}

export default Navigation;
