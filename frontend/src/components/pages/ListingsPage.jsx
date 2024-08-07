import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Listing from './ListingDetail';
import { fetchAllListings } from '../services/listingService';
import ItemGrid from '../features/ItemGrid';

const ListingsPage = () => {
    return (
        <div>
            <h1>Listings</h1>
            <div className="listings-container">
                    <ItemGrid />
            </div>
        </div>
    );
};

export default ListingsPage;
