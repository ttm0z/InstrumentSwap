import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';

function ImageUpload({ onUpload }) {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files);
        setImages([...images, ...newImages]);
        onUpload(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="image-upload">
            <form onSubmit={handleSubmit}>
                <div className="image-upload-container">
                    {images.map((image, index) => (
                        <div key={index} className="image-preview-container">
                            <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="image-preview" />
                        </div>
                    ))}
                    <label htmlFor="image-upload-input" className="image-upload-label">
                        <div className="upload-placeholder">
                            <span className="plus-sign">+</span>
                        </div>
                    </label>
                    <input
                        id="image-upload-input"
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <button type="submit" style={{ display: 'none' }}>Upload</button>
            </form>
        </div>
    );
}

export default ImageUpload;
