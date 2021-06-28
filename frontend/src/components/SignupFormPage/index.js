import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

//Render a form with controlled inputs for the new user's username, email, and password, and confirm password fields.

//On submit of the form, validate that the confirm password is the same as the password fields,
//then dispatch the signup thunk action with the form input values.
//Make sure to handle and display errors from the signup thunk action if there are any.
//If the confirm password is not the same as the password, display an error message for this.

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    if (sessionUser) {
        history.push('/')
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
};

    return (
<div className="signup_page">
        <h1 className='greeting'>
        Don't stop now!
        </h1>
        <h2 className='message'>You're only a few steps away.</h2>
    <form onSubmit={handleSubmit}>
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="email">
            Email:
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
        />
        </label>
        <label className="user">
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
        />
        </label>
        <label className="password">
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </label>
        <label className="confirm_password">
            Confirm Password:
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
        </label>
        <button className="sign_up_btn" type="submit">Sign Up</button>
    </form>
</div>
    );
}

export default SignupFormPage;
