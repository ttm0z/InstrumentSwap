import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '../features/ImageUpload';
import useCreateListing from '../hooks/useCreateListing';
import '../styles/CreateListing.css'; // Import the CSS file
import useGetUser from '../hooks/useGetUser';

const CreateListing = () => {
    const navigate = useNavigate();
    
    const { username } = useParams();
    
    const { user, loading: userLoading, error: userError } = useGetUser(username);
    
    const { handleSubmit, loading, error } = useCreateListing();
    
    const [images, setImages] = useState([]);
    
    const [formData, setFormData] = useState({
        user: '', // User ID will be set after fetching
        title: '',
        description: '',
        category: '',
        condition: '',
        price: 0.0,
        swap: false,
        status: 'active'
    });

    const categories = [
        { category: 'Guitar', imageSrc: 'path/to/guitarImage' },
        { category: 'Bass Guitar', imageSrc: 'path/to/bassImage' },
        { category: 'Keyboards and Synths', imageSrc: 'path/to/keyboardImage' },
        { category: 'Pianos', imageSrc: 'path/to/pianoImage' },
        { category: 'Percussion', imageSrc: 'path/to/percussionImage' },
        { category: 'Woodwind', imageSrc: 'path/to/woodwindImage' },
        { category: 'Brass', imageSrc: 'path/to/brassImage' },
        { category: 'Orchestral', imageSrc: 'path/to/orchestralImage' },
        { category: 'Other', imageSrc: 'path/to/otherImage' }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageUpload = (uploadedImages) => {
        setImages(uploadedImages);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            ...formData,
            user: user.user_id, // Placeholder for user ID
            price: parseFloat(formData.price),
        };

        const formDataToSend = new FormData();

        for (const key in data) {
            formDataToSend.append(key, data[key]);
        }

        images.forEach((image) => {
            formDataToSend.append('images', image);
        });

        handleSubmit(formDataToSend);
    };

    return (
        <div className='create-listing'>
            <h2 className='create-listing-header'>Create a New Listing</h2>
            <div className="create-listing-container">
                <div className='create-listing-column2'>
                    <div>
                        <ImageUpload onUpload={handleImageUpload} />
                    </div>
                </div>
                <div className="create-listing-column1">
                    <form id="create-listing-form" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.category}>
                                        {cat.category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="condition">Condition</label>
                            <input
                                type="text"
                                id="condition"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="swap">Swap</label>
                            <input
                                type="checkbox"
                                id="swap"
                                name="swap"
                                checked={formData.swap}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating Listing...' : 'Create Listing'}
                        </button>
                        <button type="button" onClick={() => navigate(`/profile/${username}`)}>Cancel</button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default CreateListing;
