import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import { fetchAllListings, fetchListingsById, fetchListingsByCategory } from '../services/listingService';
import './ItemGrid.css'; // Import CSS for styling

const ItemGrid = ({ category = null, user_id = null }) => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                let response;
                if (category) {
                    response = await fetchListingsByCategory(category);
                } else if (user_id) {
                    response = await fetchListingsById(user_id);
                } else {
                    response = await fetchAllListings();
                }
                setListings(response.data);
            } catch (error) {
                console.error("Error fetching the listings:", error);
            }
        };
        fetchListings();
    }, [category, user_id]);

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
