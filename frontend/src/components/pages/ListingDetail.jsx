import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetUser from '../hooks/useGetUser';
import useListing from '../hooks/useListing';
import Slider from '../features/Slider';
import '../styles/ListingDetail.css';

const ListingDetail = () => {
    const { listingid } = useParams();
    const { listing, loading: listingLoading, error: listingError } = useListing(listingid);
    const [userId, setUserId] = useState(null);
    const { user, loading: userLoading, error: userError } = useGetUser(null, userId);

    useEffect(() => {
        if (listing) {
            setUserId(listing.user);
        }
    }, [listing]);

    if (listingLoading || userLoading) return <div>Loading ...</div>;
    if (listingError) return <div>Error fetching listing data: {listingError.message}</div>;
    if (userError) return <div>Error fetching user data: {userError.message}</div>;

    const isOwner = user && user.id === listing.user;

    return (
        <>
            <div className='listing-header'>
                <h1>{listing.title}</h1>
            </div>

            <div className="listing-container">
                <div className="listing-photo-column">
                    <div className='image-box'>
                        <Slider images={listing.images} />
                    </div>
                </div>
                    
                <div className="listing-info-column">
                    <div>
                      <h3>About</h3>
                      <p>{listing.description}</p>
                      <p><span className='price'>${listing.price}</span></p>
                    </div>

                  <div className='listing-info-column-footer'>
                    <p>Date Listed: {listing.created_at.split('T')[0]}</p>
                    <p>Category: {listing.category}</p>
                    <p>Condition: {listing.condition}</p>
                    {user && (
                        <p>Seller: {user.first_name} {user.last_name}</p>
                    )}
                    
                    <p>Location: {listing.location}</p>
                    <p>Views: {0}</p>
                  </div>
                  {!isOwner && (
                    <div className="listing-actions">
                        <Link to={`/profile/${user ? user.username : ''}`}>
                            <button>View Seller</button>
                        </Link>
                        
                        <Link to={`/direct-message/${user ? user.user_id : ''}`}>
                            <button>Message Seller</button>
                        </Link>
                        
                    </div>
            )}
          
                </div>
            </div>
                
        </>
    );
};


  
export default ListingDetail;
