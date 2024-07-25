import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('authToken');
        axios.defaults.headers.common['Authorization'] = '';
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
