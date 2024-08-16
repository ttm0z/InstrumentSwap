import React, { useState } from 'react';
import { register } from '../services/authService';
import '../styles/Auth.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import UpdateUserForm from "../features/UpdateUserForm"
import { getUserByUsername } from '../services/userService';
const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false)
    const [user, setUser] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(username, email, password);
            console.log('Signup successful', response.data);
            alert("Signup Successful");
    
            const userData = await getUserByUsername(username); 
            setUser(userData); 
            console.log(userData);
    
            setSignedUp(true);
        } catch (error) {
            console.error('Signup error', error);
            alert("Signup Error");
        }
    };
    
    const handleUpdate = () =>{
        console.log("update")
    }
    


    return (
        <>
        {!signedUp ? (
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
        ) : (            
        <UpdateUserForm
            userData={user}
            onClose={() => navigate("/login")}
            onUpdate={handleUpdate}
        />)}
        
        </>
    );
};

export default Signup;
