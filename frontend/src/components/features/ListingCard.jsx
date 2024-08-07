import React from 'react';
import '../styles/ListingCard.css';
import { Link } from 'react-router-dom';

const ListingCard = ({ listingData }) => {
    const imageUrl = `http://localhost:8000/api/instrument_swap_media/images/${listingData.images[0]}/`;

    return (
        <div className="listing-card">
            <Link to={`/listings/${listingData.listing_id}`}>
                <div className="listing-card-image">
                    <img src={imageUrl} alt={"not found"} />
                    <div className="listing-card-overlay">
                        <h3>{listingData.title}</h3>
                        <p>${listingData.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ListingCard;
