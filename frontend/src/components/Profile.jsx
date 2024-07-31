import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

import UpdateUserForm from './UpdateUserForm'; 
import ManageListings from "./ManageListings";
import ItemList from "./ItemList";

import './Profile.css'; 

const Profile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showManageListings, setShowManageListings] = useState(false);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${username}/`);
                setUserData(response.data);
                setLoading(false);
                console.log(response.data)
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [username]);

    const handleUpdate = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${username}/`);
            setUserData(response.data);
        } catch (err) {
            setError(err);
        }
    };

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error fetching user data: {error.message}</div>;

    const defaultProfilePicture = `http://localhost:8000/api/instrument_swap_media/images/user_test_image.jpg/`;

    return (
        <>

        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-card-header">
                    <div className="profile-photo">
                        <img src={defaultProfilePicture} alt={`Profile of ${username}`} />
                    </div>
                    <div className="profile-header-info">
                        <h1>{userData.first_name} {userData.last_name}</h1>
                        <button className="info-button" onClick={() => setShowUpdateForm(true)}>Update Info</button>
                    </div>
                </div>
                
                <div className="profile-card-subheader">
                    <span className="location">{userData.location}</span>
                </div>
                
                
                {(!showUpdateForm && !showManageListings) && (
                    <>
                    <div className="profile-info">
                        <h3>{userData.first_name}'s Bio</h3>
                        <p>Insert bio here. oh say can you dolom by the ipsem re doo when the </p>
                    </div>
                    <div className="profile-actions">
                        <button className="contact-button">Contact</button>
                        <button className="message-button">Message</button>
                    </div>
                    <div className="listings">
                    <div className="listings-header">
                        
                        <h3>{userData.first_name}'s Listings</h3>
                        
                        <Link to={`/create-listing/${username}`}>
                            <button className="create-listing">Create New</button>
                        </Link> 
                        
                        
                        {/* add utility to manage listings. same page */}
                        <button className="manage-listing" onClick={() => setShowManageListings(true)}>Manage Listings</button>

                    </div>
                    <div className="item-list">
                        {/* Retrieve and display listings */}
                        <ItemList user_id={userData.user_id} />
                    </div>
                </div>


                </>
                    
                )}

            

            </div>
        </div>

        {showUpdateForm && (
            <UpdateUserForm
                userData={userData}
                onClose={() => setShowUpdateForm(false)}
                onUpdate={handleUpdate}
            />
        )}

        {showManageListings && (
            <ManageListings 
                user_id={userData.user_id}
                onClose={() => setShowManageListings(false)}
                onUpdate={handleUpdate}
            />
        )}
        
        </>
    );
};

export default Profile;
