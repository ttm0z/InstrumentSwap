import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import { fetchAllListings, fetchListingsByUserId, fetchListingsByCategory } from '../services/listingService';
import '../styles/ItemList.css'; // Import CSS for styling

const ItemList = ({ category = null, user_id = null }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3; // Number of cards to show at a time
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                let response;
                if (category) {
                    response = await fetchListingsByCategory(category);
                } else if (user_id) {
                    response = await fetchListingsByUserId(user_id);
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

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, listings.length - visibleCards));
    };

    return (
        <div className="item-list-container">
            <button className="carousel-arrow left" onClick={handlePrev}>
                &lt;
            </button>
            <div className="item-list" style={{ transform: `translateX(-${currentIndex * (200 + 20)}px)` }}>
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
            <button className="carousel-arrow right" onClick={handleNext}>
                &gt;
            </button>
        </div>
    );
};

export default ItemList;
