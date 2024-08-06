import React, { useState, useEffect } from "react";
import { fetchListingsById } from "../services/listingService";
import './ManageListings.css'
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
    

    useEffect(() => {
        const fetchListings = async () => {
            try{
                console.log(user_id);
                const response = await fetchListingsById(user_id);
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
            <h3>Your Listings</h3>
            
            <div className="listings">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        
                        <div className='listing'>
                            <h4>{listing.title}</h4>
                            <button onClick={() => {deleteListing(listing.listing_id)}}>Delete Listing</button>
                            <button>Update listing details</button>
                        </div>
                    ))
                ) : (
                    <p>You don't have any listings</p>
                )}
            </div>

            <button type="button" onClick={onClose}>Cancel</button>
            
            </>
    );
}

export default ManageListings;