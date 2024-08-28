import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import useGetUser from "../hooks/useGetUser";
import UpdateUserForm from '../features/UpdateUserForm'; 
import ManageListings from "../features/ManageListings";
import ItemGrid from "../features/ItemGrid";
import ProfilePicture from "../features/ProfilePicture";
import '../styles/Profile.css'; 
import { AuthContext } from "../services/authContext";
import { Edit, Message, PersonAdd, ManageAccounts, ContactMail, Add, Settings } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

const Profile = () => {

    const { isAuthenticated, username, logout } = useContext(AuthContext);
    const { username: ownerUsername } = useParams();
    const { user, loading, error } = useGetUser(ownerUsername);
    const isOwner = user && (user.username === localStorage.getItem('username'));
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showManageListings, setShowManageListings] = useState(false);
    const navigate = useNavigate();
    
    const handleUpdate = () => {
        setShowUpdateForm(false);
        setShowManageListings(false);
    };
    
    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error fetching user data: {error.message}</div>;

    return (
        <>
            <div className="profile-container">
                <div className="column-1">
                    <div className="profile-card-header">
                        <div className="profile-photo">
                            <ProfilePicture username={ownerUsername} picture={user.profile_picture}/>
                        </div>

                        <div className="profile-header-info">
                            <h1>{user.first_name} {user.last_name}</h1>
                            {isOwner ? (
                                <Tooltip title="Update your profile information">
                                    <button className="info-button" onClick={() => setShowUpdateForm(true)}>
                                        <Edit />
                                    </button>
                                </Tooltip>
                            ) : (
                                <Tooltip title={`Message ${user.first_name}`}>
                                    <button className="info-button" onClick={() => navigate(`/direct-message/${user.user_id}`)}>
                                        <Message />
                                    </button>
                                </Tooltip>
                            )}
                        </div>  
                    </div>
                
                    <div className="profile-card-subheader">
                        <span className="location">{user.location}</span>
                        <span className="location">User Since: {user.created_at.split('T')[0]}</span>
                    </div>
                
                    <div className="profile-info">
                        <h3>{user.first_name}'s Bio</h3>
                        <p>{user.bio} </p>

                        <h3>Sell History</h3>
                        <p>
                            {user.sell_history && user.sell_history.length === 0 ? (
                                `${user.first_name} hasn't sold anything yet`
                            ) : (
                                user.sell_history.map((item, index) => <span key={index}>{item}</span>)
                            )}
                        </p>
                    </div>
                </div>                    
                
                <div className="column-2">
                    {(!showUpdateForm && !showManageListings) && (
                        <>
                        <div className="listings">
                            <div className="listings-header">
                                <h3>{user.first_name}'s Listings</h3>
                                {isOwner && (
                                    <div className="edit-actions">
                                        <Tooltip title="Create a new listing">
                                            <Link to={`/create-listing/${username}`}>
                                                <button className="create-listing">
                                                    <Add />
                                                </button>
                                            </Link> 
                                        </Tooltip>

                                        <Tooltip title="Manage your listings">
                                            <button className="manage-listing" onClick={() => setShowManageListings(true)}>
                                                <Settings />
                                            </button>
                                        </Tooltip>
                                    </div>
                                )}        
                            </div>
                    
                            <div className="item-list">
                                <ItemGrid user_id={user.user_id} />
                            </div>
                        </div>
                        </>
                    )}

                    {showUpdateForm && (
                        <UpdateUserForm
                            userData={user}
                            onClose={() => setShowUpdateForm(false)}
                            onUpdate={handleUpdate}
                        />
                    )}

                    {showManageListings && (
                        <ManageListings 
                            user_id={user.user_id}
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
