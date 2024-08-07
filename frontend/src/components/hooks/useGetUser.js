import {useState, useEffect} from 'react';
import { getUserById, getUserByUsername } from '../services/userService';

const useGetUser = (username=null, user_id=null) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try{
                let response;
                if (username) {
                    response = await getUserByUsername(username);
                }
                else if (user_id){
                    response = await getUserById(user_id);
                }
                
                setUser(response);
            }
            catch(error){
                setError(error);
            } 
            finally{
                setLoading(false);
            }
        };
        fetchUser();
    }, [username, user_id]);
    return {user, loading, error};
};
export default useGetUser;