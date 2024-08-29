import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetUser from '../hooks/useGetUser';
import useListing from '../hooks/useListing';
import Slider from '../features/Slider';
import '../styles/ListingDetail.css';
import ProfilePicture from '../features/ProfilePicture';
import { AccountCircleOutlined, Message, MessageOutlined, PortableWifiOffSharp } from '@mui/icons-material';

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
        <div className="listing-container">
            <div className="listing-photo-column">
                <div className='image-box'>
                    <Slider images={listing.images} />
                </div>
            </div>
                    
            <div className="listing-info-column">
                
                <div className='listing-info-header'>
                    <h2>{listing.title}</h2>
                    <p>{listing.description}</p>
                    <div className='header-bottom'>
                        <div>
                            <p className='price'>CAD ${listing.price}</p>
                            <p>Listed {listing.created_at.split('T')[0]}</p>
                        </div>

                        <div className='buy-panel'>
                            <Link to={`/purchase/${listing.listing_id}`}><p>Buy Now</p></Link>
                            <Link><p>Add to Cart</p></Link>
                        </div>
                    </div>
                    
                </div>

                <div className='listing-info-column-footer'>
                    {user && (
                        <div className='seller-panel'>
                        <div className='seller-details'>
                            <ProfilePicture username={user.username}/>
                            <div>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{listing.location}</p>
                            </div>
                        </div>
                        <div className='seller-links'>
                            <Link to={`/profile/${user.username}`}>
                            <p className='link'>
                                <AccountCircleOutlined/>
                                View Profile
                            </p>
                            </Link>
                            <Link to={`/direct-message/${user.user_id}`}>
                            <p className='link'> 
                                <MessageOutlined />
                                Message {user.first_name}
                            </p>
                            </Link>
                        </div>
                        </div>  
                    )}
                </div>          
            </div>
        </div>
                
        </>
    );
};


  
export default ListingDetail;
