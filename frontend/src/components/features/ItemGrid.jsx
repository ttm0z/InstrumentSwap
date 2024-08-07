import React, { useState, useEffect } from 'react';
import useListings from '../hooks/useListings';

import ListingCard from './ListingCard';
import '../styles/ItemGrid.css'; // Import CSS for styling

const ItemGrid = ({ category = null, user_id = null }) => {
    const {listings, loading, error} = useListings(category, user_id);
    
    console.log(listings)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading listings: {error.message}</p>;
    return (
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
    );
};

export default ItemGrid;
