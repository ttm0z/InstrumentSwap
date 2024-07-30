import React from 'react';
import PropTypes from 'prop-types';
import './CategoryCard.css';

import { Link } from 'react-router-dom';

const CategoryCard = ({ category, subcategories, imageSrc }) => {
    
    
    return (
        <Link to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="category-card">
            <div className="category-card-image">
                {imageSrc && <img src={imageSrc} alt={`${category} image`} />}
                <div className="category-card-overlay">
                    <h2>{category}</h2>
                    {subcategories && subcategories.length > 0 && (
                        <ul>
                            {subcategories.map((subcategory, index) => (
                                <li key={index}>{subcategory}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
        </Link>
        
    );
};

CategoryCard.propTypes = {
    category: PropTypes.string.isRequired,
    subcategories: PropTypes.arrayOf(PropTypes.string),
    imageSrc: PropTypes.string
};

CategoryCard.defaultProps = {
    subcategories: [],
    imageSrc: ''
};

export default CategoryCard;
