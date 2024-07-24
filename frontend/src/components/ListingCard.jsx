import React from 'react';
import PropTypes from 'prop-types';
import './ListingCard.css';

const ListingCard = ({ ListingData }) => {
    return (
        <div className="listing-card">
            {ListingData.imageSrc && <img src={ListingData.imageSrc} alt={`image`} className="listing-card-image" />}
            <h2>{ListingData.title}</h2>
            <p>{ListingData.description}</p>
                
        </div>
    );
};


export default ListingCard;
