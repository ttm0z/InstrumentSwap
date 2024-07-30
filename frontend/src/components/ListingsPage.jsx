import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Listing from './ListingDetail';

const ListingsPage = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/listings/');
                console.log('API response:', response.data); // Log the response data
                if (Array.isArray(response.data)) {
                    setListings(response.data);
                } else {
                    console.error('API response is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div>
            <h1>Listings</h1>
            <div className="listings-container">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <Listing
                            key={listing.id}
                            image={listing.image}
                            title={listing.title}
                            description={listing.description}
                            price={listing.price}
                            seller={listing.seller}
                        />
                    ))
                ) : (
                    <p>No listings available</p>
                )}
            </div>
        </div>
    );
};

export default ListingsPage;
