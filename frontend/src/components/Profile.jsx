import React
, { useState, useEffect }from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";

const Profile = () => {

    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/by-username/${username}`);
                console.log("response", response.data)
                setUserData(response.data);
                setLoading(false);
            }
            catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [username]);

    if(loading) return <div>Loading ...</div>
    if(error) return <div>Error fetching user data: {error.message}</div>

    return  (
        <div>
            <h1>{username}'s Profile</h1>
            <p>{userData}</p>
        </div>
    );
};

export default Profile;