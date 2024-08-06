import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {getUserIdByUsername} from '../services/userService.js'
import './ListingDetail.css'

const ListingDetail = () => {
    
    const { listingid } = useParams();
    //current user Id
    const userId = getUserIdByUsername(localStorage.getItem("username"));
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [ownerData, setOwnerData] = useState(null)
    

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/listings/${listingid}/`);
                let id = await userId;
                console.log(response.data)
                setListing(response.data);
                const owner = await axios.get(`http://localhost:8000/api/users/id/${response.data.user}`);
                setOwnerData(owner.data)
                if(id == response.data.user){
                    setIsOwner(true);
                }

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [listingid]);

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error fetching listing data: {error.message}</div>;

    return (
        <>
            <div className='listing-header'>
                <h1>{listing.title}</h1>
            </div>

            <div className="listing-container">
                <div className="listing-photo-column">
                    <div className='image-box'>
                        <Slider images={listing.images}/>
                    </div>
                </div>
                    
                    
                <div className="listing-info-column">
                    <h3>About</h3>
                    <p>{listing.description}</p>                    
                    <p><p className='price'>${listing.price}</p></p>
                    <p>Date Listed: {listing.created_at.split('T')[0]}</p>
                    <p>Category: {listing.category}</p>
                    <p>Condition: {listing.condition}</p>    
                    <p>Seller: {ownerData.first_name} {ownerData.last_name}</p>
                    <p>Location: {listing.location}</p>    
                </div>

            </div>
                
                {!isOwner && (
                <div className="listing-actions">
                    <Link to={`/profile/${ownerData.username}`}>
                        <button className="contact-button">View Seller</button>
                    </Link>
                    <button className="message-button">Message Seller</button>
                </div>
                )}


        </>
    );
};

const Slider = ({ images }) => {
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
          <img
            src={`http://localhost:8000/api/instrument_swap_media/images/${images[currentIndex]}`}
            alt={`Slide ${currentIndex}`}
            className="slider-image"
          />
        </div>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    );
  };
  
export default ListingDetail;
