import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UpdateUserForm.css'

const UpdateUserForm = ({ userData, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        username: userData.username,
        first_name: userData.firstName,
        bio: userData.bio,
        last_name: userData.lastName,
        location: userData.location,
        profile_picture: userData.profilePhotoUrl
        
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData.username)
            await axios.post(`http://localhost:8000/api/users/${formData.username}/update/`, formData);                            
            onUpdate(); // Refresh profile data
            onClose(); // Close the form
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="update-profile-form">
            <h2>Update Profile</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={formData.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={formData.lastName} onChange={handleChange} />
                </label>
                <label>
                    Bio:
                    <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
                </label>

                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </label>
                <label>
                    Profile Photo URL:
                    <input type="text" name="profile_picture" value={formData.profilePhotoUrl} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
