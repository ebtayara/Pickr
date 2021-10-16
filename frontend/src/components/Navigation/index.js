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
    <div className="upload_link">
        <div className = "photos_container">
            <NavLink to="/upload" className="photos">Photos</NavLink>
        </div>

        {/* <a href="http://localhost:3000/upload" target="_blank">
                <div className="photos">
                    <i class="fas fa-photo-video"></i>
                </div>
        </a> */}
    </div>
    <div className="album_link">
        <div className="albums_container">
            <NavLink to="/albums" className="albums">Albums</NavLink>
        </div>
        {/* <a href="http://localhost:3000/albums" target="_blank">
                <div className="albums">
                    <i class="fad fa-album-collection"></i>
                </div>
        </a> */}
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
                {/* {isLoaded && sessionLinks} */}
                <NavLink to="/login" id="log_in_btn">Log In</NavLink>
                <NavLink to="/signup" id="sign_up_btn">Sign Up</NavLink>
            </div>
        </div>
    <div id="footer">
        <div id="navFooterContainer">
        <div className="developed">
            Developed by
        </div>
            <a href="https://github.com/ebtayara" target="_blank" id="github_link" rel="noreferrer">
                <div class="gitHub">
                    <i class="fab fa-github"></i>
                </div>
            </a>
            <a href="https://www.linkedin.com/in/ebrahim-tayara-b9b50871/" target="_blank" rel="noreferrer">
                <div className="linkedIn">
                    <i class="fab fa-linkedin"></i>
                </div>
            </a>
            <a href="https://www.instagram.com/the_ebester/" target="_blank" rel="noreferrer">
                <div className="insta">
                    <i class="fab fa-instagram"></i>
                </div>
            </a>
            <a href="https://www.facebook.com/ebrahim.s.tayara" target="_blank" rel="noreferrer">
                <div className="facebook">
                    <i class="fab fa-facebook"></i>
                </div>
            </a>
            </div>
        </div>
    </div>
    );
}

export default Navigation;
