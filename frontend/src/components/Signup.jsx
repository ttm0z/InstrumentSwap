import React, { useState } from 'react';
import { register } from '../services/authService';
import './Auth.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, email, password)
            .then(response => {
                console.log('Signup successful', response.data);
                alert("Signup Successful");
                setSignedUp(true)
            })
            .catch(error => {
                console.error('Signup error', error);
                alert("Signup Error");
            });
    };

    // once signed up, set initial data
    if(signedUp) return (
        <>
        <h3>Profile Setup</h3>
        <div className="update-profile-form">
            <h2>Update Profile</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={formData.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={formData.lastName} onChange={handleChange} />
                </label>
                <label>
                    Bio:
                    <input type="text" name="location" value={formData.bio} onChange={handleChange} />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
        <button></button>
        </>
    );


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
