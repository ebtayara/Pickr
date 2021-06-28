import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    if (sessionUser) {
        history.push('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
<div className="login_page">
        <h1 className='greeting'>
        Let the artistry begin!
        </h1>
        <h2 className='message'>Join our community, home to all your pet photos.</h2>
    <form onSubmit={handleSubmit} className="form">
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="user">
            Username or Email: 
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
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
        <button className="log_in_btn" type="submit">Log In</button>
        {/* <div>
            <div className="login_title">
                <h1>
                You have an awesome pet you want to show off?!
                </h1>
            </div>
        </div> */}
    </form>
</div>
    );
}

export default LoginFormPage;
