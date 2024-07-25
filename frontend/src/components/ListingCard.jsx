import React from 'react';
import './ListingCard.css'
import { Link } from 'react-router-dom';
const ListingCard = ({ listingData }) => {
    return (
        <div className="listing-card">
            <Link to={`/listings/${listingData.listing_id}`}><h3>{listingData.title}</h3></Link>
            <p>{listingData.description}</p>
            <p>Price: ${listingData.price}</p>
            <img src={listingData.images} alt={listingData.title} />
        </div>
    );
};

export default ListingCard;
