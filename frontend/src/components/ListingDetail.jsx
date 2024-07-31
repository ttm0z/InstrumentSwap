import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {getUserIdByUsername} from '../services/userService.js'
import './ListingDetail.css'
const ListingDetail = () => {
    
    const { listingid } = useParams();
    const userId = getUserIdByUsername(localStorage.getItem("username"));
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/listings/${listingid}/`);
            
                console.log(await userId == response.data.user)
                setListing(response.data);
                
                if(await userId == response.data.user){
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
            <div className="listing-container">

                <div className="listing-header-info">
                    
                    <div className='listing-header'>
                        <h1>{listing.title}</h1>
                        
                        {isOwner && (
                            <button>+</button>
                        )}

                    </div>
                    
                    <div className="listing-photo">
                        <img src={`http://localhost:8000/api/instrument_swap_media/images/${listing.images[0]}`} alt={`Listing of ${listing.title}`} />
                    </div>
                    
                    
                    <div className="listing-info">
                    
                        <h3>About</h3>
                        <p>{listing.description}</p>                    
                        <p>Category: {listing.category}</p>
                        <p>Condition: {listing.condition}</p>
                        <p>Asking Price: ${listing.price}</p>
                        <p>Location: {listing.location}</p>
                    
                    </div>
                

                </div>
                    
                


                <div className="listing-actions">
                    <button className="contact-button">Contact Seller</button>
                    <button className="message-button">Message Seller</button>
                </div>
            </div>

        </>
    );
};

export default ListingDetail;
