import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8000'
});

/** initConversation
 * 
 * @returns json conversation object
 */
export const initConversation = (id_1, id_2) => {

    return api.post(`/api/conversations/conversation/${id_1}/${id_2}/`)
    
};