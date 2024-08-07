import axios from 'axios';


export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/username/${username}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching user ID:', error);
        throw new Error(error.response ? error.response.data.detail : error.message);
    }
};

export const getUserById = async (user_id) => {
    try {        
        const response = await axios.get(`http://localhost:8000/api/users/id/${user_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user ID:', error);
        throw new Error(error.response ? error.response.data.detail : error.message);
    }
};