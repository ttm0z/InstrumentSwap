import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchListing = (listingId) => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`/api/listings/${listingId}/`);
                setListing(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [listingId]);

    return { listing, loading, error };
};

export default useFetchListing;
