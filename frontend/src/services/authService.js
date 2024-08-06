
// authService.js
import axios from 'axios';

// Optionally set a base URL if Django is on a different port
const api = axios.create({
    baseURL: 'http://localhost:8000'
});

//Register a user
export const register = (username, email, password) => {
    console.log(username, email, password);
    return api.post('/api/auth/register/', {
        username,
        email,
        password
    });
};

//Login
export const login = (username, password) => {
    return api.post('/api/auth/login/', {
        username, password
    });
};

