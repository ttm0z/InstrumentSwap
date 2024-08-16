import React, { useState } from 'react';
import '../styles/ImageUpload.css';
import Slider from './Slider';
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
        
            <div className='image-preview-container'>
                <Slider images={images} upload={true}/>
            </div>
            <form>
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
        
        </div>
    );
}

export default ImageUpload;
