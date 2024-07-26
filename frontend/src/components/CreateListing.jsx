import React, { useState } from 'react';
import axios from 'axios';

const CreateListing = () => {
    const [formData, setFormData] = useState({
        user: '', // This should be populated with the user's ID
        title: '',
        description: '',
        category: '',
        condition: '',
        price: 0.0,
        swap: false,
        images: '', // This should be a JSON string
        location: '',
        status: 'active'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            price: parseFloat(formData.price), // Ensure price is a decimal
            images: JSON.parse(formData.images) // Ensure images is a JSON object
        };
        console.log('Submitting form data:', data);
        try {
            await axios.post('http://localhost:8000/api/listings/create_listing/', data);
            alert('Listing created successfully!');
        } catch (error) {
            console.error('Error creating listing:', error);
            alert('Error creating listing. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create a New Listing</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user">User ID</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
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
                <div>
                    <label htmlFor="images">Images (JSON format)</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        default='{"imageUrl":""}'
                        value={formData.images}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Create Listing</button>
            </form>
        </div>
    );
};

export default CreateListing;
