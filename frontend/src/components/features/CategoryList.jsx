import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import '../styles/CategoryList.css';
import categories from '../../categories';

const CategoryList = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - visibleCards));
    };

    return (
        <div className="category-list-container">
            <button className="carousel-arrow left" onClick={handlePrev}>
                &lt;
            </button>
            <div className="category-list" style={{ transform: `translateX(-${currentIndex * (200 + 20)}px)` }}>
                {categories.map((categoryData, index) => (
                    <CategoryCard
                        key={index}
                        category={categoryData.category}
                        link={categoryData.link}
                        imageSrc={categoryData.imageSrc} // Pass imageSrc to CategoryCard
                    />
                ))}
            </div>
            <button className="carousel-arrow right" onClick={handleNext}>
                &gt;
            </button>
        </div>
    );
};

export default CategoryList;
