import React, {useState} from 'react';
import {register} from '../services.authService';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, email, password)
            .then(response => {
                console.log('Signup successful', response.data);
            })
            .catch(error => {
                console.error('Signup error', error);
            });
    };

    return (
        <form>
            <input type="text" placeholer="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;