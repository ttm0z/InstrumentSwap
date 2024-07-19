import React, {useState} from 'react';
import {login} from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .then(response => {
                console.log('Login successful', response.data);
            })
            .catch(error => {
                console.error('Login error', error);
            });
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Log In</button>
        </form>
    );
};

export default Login;