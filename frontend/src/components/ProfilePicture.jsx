import React, { useState } from 'react';
import './ProfilePicture.css';
import axios from 'axios';



function ProfilePicture({ username, picture }) {
    const defaultProfilePicture = `http://localhost:8000/api/instrument_swap_media/images/user_test_image.jpg/`;    
    const profilePicture = `http://localhost:8000/api/instrument_swap_media/images/${picture}/`;
    const [image, setImage] = useState(null);
    
    console.log(picture)
    const handleImageChange = async (e) => {
        const newImage = e.target.files[0];
        setImage(newImage);

        const formData = new FormData();
        formData.append('profile_picture', newImage)

        try {
            const response = await axios.post(`http://localhost:8000/api/users/${username}/upload_profile_picture/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading the image:', error);
        }

    };

    return (
        <div className="profile-picture-upload">
            <form>
                <div className="profile-picture-upload-container">
                    <label htmlFor="profile-picture-upload-input" className="profile-picture-upload-label">
                        <div className="upload-placeholder">
                            <img
                                src={picture ? profilePicture : defaultProfilePicture}
                                alt="Profile"
                                className="profile-picture-preview"
                            />
                        </div>
                    </label>
                    <input
                        id="profile-picture-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
            </form>
        </div>
    );
}

export default ProfilePicture;
