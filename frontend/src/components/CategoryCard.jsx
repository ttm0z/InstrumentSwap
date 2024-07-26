import React from 'react';
import PropTypes from 'prop-types';
import './CategoryCard.css';

const CategoryCard = ({ category, subcategories, imageSrc }) => {
    return (
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
