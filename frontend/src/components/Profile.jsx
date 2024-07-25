import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import './Profile.css'; // Ensure you have the necessary CSS

const Profile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${username}/`);
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [username]);

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error fetching user data: {error.message}</div>;

    return (
        <div className="profile-card">
            <div className="profile-photo">
                <img src={userData.profilePhotoUrl || 'default-photo-url.jpg'} alt={`${username}'s profile`} />
            </div>
            <div className="profile-info">
                <h1>{username}'s Profile</h1>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>First Name:</strong> {userData.firstName}</p>
                <p><strong>Last Name:</strong> {userData.lastName}</p>
                <p><strong>Location:</strong> {userData.location}</p>
                <p><strong>Member Since:</strong> {userData.memberSince}</p>
            </div>
            <div className="profile-actions">
                <button className="contact-button">Contact</button>
                <button className="message-button">Message</button>
            </div>
            <button className="info-button">Update Info</button>
        </div>
    );
};

export default Profile;
