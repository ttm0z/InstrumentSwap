import { useState, useEffect } from 'react';
import { fetchListingsByListingId } from '../services/listingService';

const useListing = (listing_id = null) => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetchListingsByListingId(listing_id);
                setListing(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (listing_id) {
            fetchListing();
        }
    }, [listing_id]);

    return { listing, loading, error };
};

export default useListing;
