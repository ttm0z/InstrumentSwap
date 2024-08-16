import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { fetchListingsByUserId } from "../services/listingService";
import '../styles/ManageListings.css'
import { deleteListing } from "../services/listingService";
/** Manage Listings
 * - Display all listings belonging to user
 * - Provide interface to update or remove listings
 * 
 * 
 * @returns 
 */

const ManageListings = ({user_id, onClose, onUpdate}) => {

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try{
                console.log(user_id);
                const response = await fetchListingsByUserId(user_id);
                setListings(response.data)
                setLoading(false)
            }
            catch(error){
                console.error("Error fetching the listings: ", error);
                setError(true);
                setLoading(false)
            }
        };
        fetchListings();
    }, []);

    if (loading) return (
        <>
            <p>loading...</p>;
            <button type="button" onClick={onClose}>Cancel</button>
        </>
    ) 
    if (error) return (
        <>
            <p>error</p>
            <button type="button" onClick={onClose}>Cancel</button>
        </>
        
    );
    return (
        <>
            <div>
            <h3>Your Listings</h3>
            
            <div className="manage-listings">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        
                        <div className='manage-listing-container'>
                            <h4>{listing.title}</h4>
                            <button onClick={() => {deleteListing(listing.listing_id)}}>Delete Listing</button>
                            <button onClick={() => {onUpdate();}}>Update listing details</button>
                            <button onClick={() => {navigate(`/listings/${listing.listing_id}`)}}>View Listing</button>
                        </div>
                    ))
                ) : (
                    <p>You don't have any listings</p>
                )}
            </div>

            <button className="close" type="button" onClick={onClose}>Cancel</button>
            </div>
            
            
            </>
    );
}

export default ManageListings;