import React, { useState } from 'react';
import "../styles/Slider.css";

const Slider = ({ images, upload = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="custom-slider">
            <button className="prev" onClick={prevSlide}>
                &#10094;
            </button>
            <div className="slide">
                {upload ? (
                    images.length > 0 ? (
                        <img
                            key={currentIndex}
                            src={URL.createObjectURL(images[currentIndex])}
                            alt={`Preview ${currentIndex}`}
                            className="slider-image"
                        />
                    ) : (
                        <div className="no-image-placeholder">
                            <span>No images uploaded</span>
                        </div>
                    )
                ) : (
                    <img
                        src={`http://localhost:8000/api/instrument_swap_media/images/${images[currentIndex]}`}
                        alt={`Slide ${currentIndex}`}
                        className="slider-image"
                    />
                )}
            </div>
            <button className="next" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default Slider;
