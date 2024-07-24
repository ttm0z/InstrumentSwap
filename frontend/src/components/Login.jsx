import React, { useContext, useState } from 'react';
import { login } from '../services/authService';
import './Auth.css'; // Import the CSS file
//import {AuthContext} from '../services/authContext.jsx';

const Login = () => {
    //const {setIsAuthenticated, setAuthStatus} = useContext(AuthContext)
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .then(response => {
                console.log('Login successful', response.data);
                alert("Login Successful");
                //setIsAuthenticated(true);
                //setUsername(username);
                //redirect to the user home page
            })
            .catch(error => {
                console.error('Login error', error);
                alert("Login Error");
            });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3 className="auth-header">Log In</h3>
            <input 
                type="text" 
                placeholder="Username" 
                className="auth-input" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="auth-input" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit" className="auth-button">Log In</button>
        </form>
    );
};

export default Login;
