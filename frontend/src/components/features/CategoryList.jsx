import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import '../styles/CategoryList.css';

import guitarImage from '../../assets/category_samples/guitar_sample.png';
import bassImage from '../../assets/category_samples/bass_sample.png';
import keyboardImage from '../../assets/category_samples/keyboard_sample.png';
import pianoImage from '../../assets/category_samples/piano_sample.png';
import percussionImage from '../../assets/category_samples/percussion_sample.png';
import woodwindImage from '../../assets/category_samples/woodwind_sample.png';
import brassImage from '../../assets/category_samples/brass_sample.png';
import orchestralImage from '../../assets/category_samples/orchestral_sample.png';
import otherImage from '../../assets/category_samples/other_sample.png';

const categories = [
    {
        category: 'Guitar',
        link: 'guitar',
        imageSrc: guitarImage
    },
    {
        category: 'Bass Guitar',
        link: 'bass',
        imageSrc: bassImage
    },
    {
        category: 'Keyboards and Synths',
        link: 'keys',
        imageSrc: keyboardImage
    },
    {
        category: 'Piano',
        link: 'piano',
        imageSrc: pianoImage
    },
    {
        category: 'Percussion',
        link: 'percusssion',
        imageSrc: percussionImage
    },
    {
        category: 'Woodwind',
        link: 'woodwind',
        imageSrc: woodwindImage
    },
    {
        category: 'Brass',
        link: 'brass',
        imageSrc: brassImage
    },
    {
        category: 'Orchestral',
        link: 'orchestral',
        imageSrc: orchestralImage
    },
    {
        category: 'Other',
        link: 'other',
        imageSrc: otherImage
    }
];


const CategoryList = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 3; // Number of cards to show at a time

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
