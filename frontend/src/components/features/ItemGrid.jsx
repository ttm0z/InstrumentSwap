import React, { useState, useEffect } from 'react';
import useListings from '../hooks/useListings';

import ListingCard from './ListingCard';
import '../styles/ItemGrid.css'; // Import CSS for styling
import SortBar from './SortBar';

const ItemGrid = ({ category = null, user_id = null }) => {
    
    const [sortOption, setSortOption] = useState(null);
    const {listings, loading, error, refetch} = useListings(category, user_id, sortOption);
    
    
    useEffect(() => {
        refetch();
    }, [sortOption])

    const handleSortChange = (sortOption) => {
        setSortOption(sortOption);
        console.log("itemGrid sort option: ", sortOption)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading listings: {error.message}</p>;
    
    return (
        <div className = 'grid-container'>
        <SortBar onSortChange={handleSortChange} />
        <div className="item-list-grid">
            {listings.length > 0 ? (
                listings.map((listing) => (
                    <ListingCard
                        key={listing.listing_id}
                        listingData={listing} // Ensure this matches with ListingCard's expected prop
                    />
                ))
            ) : (
                <p>No listings available</p>
            )}
        </div>
        </div>
        
    );
};

export default ItemGrid;
