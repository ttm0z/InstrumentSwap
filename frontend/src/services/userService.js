import axios from 'axios';


export const getUserIdByUsername = async (username) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users/username/${username}`);
        return response.data.user_id; // Assuming `user_id` is the key returned by the API
    } catch (error) {
        console.error('Error fetching user ID:', error);
        throw new Error(error.response ? error.response.data.detail : error.message);
    }
};