import React, { useState } from 'react';
import '../styles/SortBar.css';

const SortBar = ({ onSortChange }) => {
    const [selectedSort, setSelectedSort] = useState(''); // To track the selected sort option

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
        onSortChange(sortOption); // Pass the selected sort option to the parent
    };

    return (
        <div className='sort-bar'>
            <p>Sort By: </p>
            <ul>
                <li><button 
                    className={selectedSort === 'price_asc' ? 'selected' : ''}
                    onClick={() => handleSortChange('price')}
                >
                    Price Ascending
                </button></li>
                <li><button 
                    className={selectedSort === 'price_desc' ? 'selected' : ''}
                    onClick={() => handleSortChange('-price')}
                >
                    Price Descending
                </button></li>
                <li><button 
                    className={selectedSort === 'newest' ? 'selected' : ''}
                    onClick={() => handleSortChange('created_at')}
                >
                    Newest
                </button></li>
                <li><button 
                    className={selectedSort === 'oldest' ? 'selected' : ''}
                    onClick={() => handleSortChange('-created_at')}
                >
                    Oldest
                </button></li>
                <li><button 
                    className={selectedSort === 'alphabetical' ? 'selected' : ''}
                    onClick={() => handleSortChange('title')}
                >
                    Alphabetical
                </button></li>
                <li><button 
                    className={selectedSort === 'rev_alphabetical' ? 'selected' : ''}
                    onClick={() => handleSortChange('-title')}
                >
                    Rev. Alphabetical
                </button></li>
            </ul>
        </div>
    );
};

export default SortBar;
