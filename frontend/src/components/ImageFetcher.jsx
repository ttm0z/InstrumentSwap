// ImageFetcher.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageFetcher = ({ filename }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/instrument_swap_media/${filename}/`);
                setImageUrl(response.data);
            } catch (error) {
                console.error('Error fetching the image URL', error);
            }
        };

        fetchImageUrl();
    }, [filename]);

    return (
        <div>
            {imageUrl ? (
                <img src={`http://localhost:8000/api/instrument_swap_media/${filename}`} alt={filename} />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default ImageFetcher;
