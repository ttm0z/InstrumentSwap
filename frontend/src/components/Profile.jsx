import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

import UpdateUserForm from './UpdateUserForm'; 
import ManageListings from "./ManageListings";
import ItemGrid from "./ItemGrid";
import ProfilePicture from "./ProfilePicture";

import './Profile.css'; 

const Profile = () => {

    const navigate = useNavigate();

    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isOwner, setIsOwner] = useState(false)

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showManageListings, setShowManageListings] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${username}/`);
                setUserData(response.data);
                setLoading(false);
                console.log(response.data)
                if(response.data.username == localStorage.getItem('username')){
                    setIsOwner(true)
                }
            } 
            catch (err) {
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
        } 
        catch (err) {
            setError(err);
        }
    };

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error fetching user data: {error.message}</div>;

    return (
        <>
            <div className="profile-container">
                <div className="column-1">
                    <div className="profile-card-header">
                        <div className="profile-photo">
                            <ProfilePicture username={username} picture={userData.profile_picture}/>
                        </div>

                        <div className="profile-header-info">
                            <h1>{userData.first_name} {userData.last_name}</h1>
                            {isOwner ? (
                                <button className="info-button" onClick={() => setShowUpdateForm(true)}>Update Info</button>
                            ) : (
                                <button className="info-button" onClick={() => navigate(`/direct-message/${userData.user_id}`)}>Message {userData.first_name}</button>
                            )}
                        </div>  
                    </div>
                
                    <div className="profile-card-subheader">
                        <span className="location">{userData.location}</span>
                        <span className="location">User Since: {userData.created_at.split('T')[0]}</span>
                    </div>
                
                    <div className="profile-info">
                        <h3>{userData.first_name}'s Bio</h3>
                        <p>{userData.bio} </p>

                        <h3>Sell History</h3>
                        <p>
                            {userData.sell_history && userData.sell_history.length === 0 ? (
                                `${userData.first_name} hasn't sold anything yet`
                            ) : (
                                userData.sell_history.map((item, index) => <span key={index}>{item}</span>)
                            )}
                        </p>
                    </div>
                        
                    {!isOwner && (
                        <div className="profile-actions">
                            <button className="contact-button">Contact</button>
                            <button className="message-button">Message</button>
                        </div>
                    )}
                
                </div>                    
                
                <div className="column-2">
                    {(!showUpdateForm && !showManageListings) && (
                        <>
                        <div className="listings">
                            <div className="listings-header">
                        
                                <h3>{userData.first_name}'s Listings</h3>
                            {isOwner && (
                                <>
                                <Link to={`/create-listing/${username}`}>
                                <button className="create-listing">Create New</button>
                            </Link> 
                    
                            <button className="manage-listing" onClick={() => setShowManageListings(true)}>Manage Listings</button>
                                </>

                            )}        


                    </div>
                    
                    <div className="item-list">
                        {/* Retrieve and display listings */}
                        <ItemGrid user_id={userData.user_id} />
                    </div>
                </div>


                </>
                    
                )}

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
            </div>
        
        </div>

        
        </>
    );
};

export default Profile;
