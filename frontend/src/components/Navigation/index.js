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
    <>
    <div className="upload_btn">
        <div>
            <NavLink to="/upload">Photos</NavLink>
        </div>
    </div>
    <div className="album_btn">
        <div>
            <NavLink to="/albums">Albums</NavLink>
        </div>
    </div>
        <div>
            <ProfileButton id="profile_btn" user={sessionUser} />
        </div>
    </>
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
    <div id="nav_container">
        <div id="bar">
            <div>
                <NavLink exact to="/" id="home_btn">pickr</NavLink>
            </div>
            <div id="nav_flex_container">
                {isLoaded && sessionLinks}
            </div>
        </div>
    <div id="footer">
        <div id="navFooterContainer">
        Developed by
            <a href="https://github.com/ebtayara" target="_blank" id="github_link">
                <div class="gitHub">
                    <i class="fab fa-github"></i>
                </div>
            </a>
            <a href="https://www.linkedin.com/in/ebrahim-tayara-b9b50871/" target="_blank">
                <div class="linkedIn">
                    <i class="fab fa-linkedin"></i>
                </div>
            </a>
            <a href="https://www.instagram.com/the_ebester/" target="_blank">
                <div class="insta">
                    <i class="fab fa-instagram"></i>
                </div>
            </a>
            <a href="https://www.facebook.com/ebrahim.s.tayara" target="_blank">
                <div class="facebook">
                    <i class="fab fa-facebook"></i>
                </div>
            </a>
        </div>
    </div>
    </div>
    );
}

export default Navigation;
