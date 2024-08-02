import React, { useState } from 'react';
import './ImageUpload.css';

function ImageUpload({ onUpload }) {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files);
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onUpload(updatedImages);
    };

    return (
        <div className="image-upload">
            <form>
                Upload Photos
                <div className="image-upload-container">
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
            </form>
            <div className='image-preview-container'>
                {images.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="image-preview" />
                ))}
            </div>
        </div>
    );
}

export default ImageUpload;
