import { useState } from 'react';
import { createListing } from '../services/listingService';

const useCreateListing = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            await createListing(formData);
            alert('Listing created successfully!');
        } catch (err) {
            console.error('Error creating listing:', err);
            setError('Error creating listing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading, error };
};

export default useCreateListing;
