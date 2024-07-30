import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ListingDetail.css'; 

const ListingDetail = () => {
    const { listingid } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/listings/${listingid}/`);
                setListing(response.data);
                console.log(response.data.images)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [listingid]);

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error fetching listing data: {error.message}</div>;

    return (
        <>
            <div className="listing-container">
                <div className="listing-card">
                    <div className="listing-card-header">
                        <div className="listing-photo">
                            <img src={`http://localhost:8000/api/instrument_swap_media/images/${listing.images[0]}`} alt={`Listing of ${listing.title}`} />
                        </div>

                    </div>
                    <div className="listing-header-info">
                            <h1>{listing.title}</h1>
                            <p>{listing.category}</p>
                            <p>{listing.condition}</p>
                            <p>{listing.price}</p>
                        </div>
                    <div className="listing-card-subheader">
                        <span className="location">{listing.location}</span>
                    </div>

                    <div className="listing-info">
                        <h3>About this listing</h3>
                        <p>{listing.description}</p>
                    </div>

                    <div className="listing-actions">
                        <button className="contact-button">Contact Seller</button>
                        <button className="message-button">Message Seller</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListingDetail;
