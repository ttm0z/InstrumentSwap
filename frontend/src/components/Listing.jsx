import React from 'react';
import './Listing.css'
/** Listings Component 
 * TODO
 * - Fix endpoint to fetch sellers username
 * - Properly format test images
 * 
*/

const Listing = ({image, title, description, price, seller}) => {
    return (
        <div className="listing">
            <img src={image} alt={title} className="listing-image"/>
            <div className="listing-details">
                <h2 className="listing-title">{title}</h2>
                <p className="lisiting-description">{description}</p>
                <p className="listing-price">${price}</p>
                <p className="listing-seller">Seller: {seller}</p>
                <div className="listing-actions">
                    <button className="view-details-button">View Listing</button>
                    <button className="contact-seller-button">Contact Seller</button>
                </div>
            </div>
        </div>
    );
};

export default Listing;