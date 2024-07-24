import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/check-auth')
            .then(response => {
                console.log(response)
                setIsAuthenticated(response.data.isAuthenticated);
                if (response.data.isAuthenticated) {
                    setUsername(response.data.username);
                }
            })
            .catch(error => {
                console.error('Error checking auth status', error);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, setIsAuthenticated, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
};

export default {AuthContext, AuthProvider};