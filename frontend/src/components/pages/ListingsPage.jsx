import React, { useState, useEffect } from 'react';

import ItemGrid from '../features/ItemGrid';

import '../styles/ListingsPage.css'

const ListingsPage = () => {
    return (
        
        <div className="listings-page-container">
            <h1>Listings</h1>
            <ItemGrid />
        </div>
        
    );
};

export default ListingsPage;
