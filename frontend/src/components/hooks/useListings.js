import { useState, useEffect } from 'react';
import { fetchAllListings, fetchListingsByCategory, fetchListingsByUserId } from '../services/listingService';

const useListings = (category, user_id, sortOption) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = () => {
        setLoading(true);
        setError(null);

        let fetchFunction;
        if (category) {
            fetchFunction = () => fetchListingsByCategory(category, sortOption);
        } else if (user_id) {
            fetchFunction = () => fetchListingsByUserId(user_id, sortOption);
        } else {
            fetchFunction = () => fetchAllListings(sortOption);
        }

        fetchFunction()
            .then(response => {
                setListings(response.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        refetch();
    }, [category, user_id, sortOption]); // Depend on category, user_id, and sortOption

    return { listings, loading, error, refetch };
};

export default useListings;
