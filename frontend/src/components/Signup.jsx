import React, { useState } from 'react';
import { register } from '../services/authService';
import './Auth.css'; // Import the CSS file

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
        <form className="auth-form" onSubmit={handleSubmit}>
            
            <h3 className="auth-header">Sign Up</h3>
            <input 
                type="text" 
                placeholder="Username" 
                className="auth-input" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                className="auth-input" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="auth-input" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit" className="auth-button">Sign Up</button>
        </form>
    );
};

export default Signup;
