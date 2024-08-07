import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CategoryCard.css';

import { Link } from 'react-router-dom';

const CategoryCard = ({ category, link, imageSrc }) => {
    
    
    return (
        <Link to={`/categories/${link}`}>
        <div className="category-card">
            <div className="category-card-image">
                {imageSrc && <img src={imageSrc} alt={`${category} image`} />}
                <div className="category-card-overlay">
                    <h2>{category}</h2>
                </div>
            </div>
        </div>
        </Link>
        
    );
};

CategoryCard.propTypes = {
    category: PropTypes.string.isRequired,
    imageSrc: PropTypes.string
};

CategoryCard.defaultProps = {
    imageSrc: ''
};

export default CategoryCard;
