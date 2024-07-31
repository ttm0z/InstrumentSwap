import React, { useState, useEffect } from "react";
import { fetchListingsById } from "../services/listingService";
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
                console.log(response.data)
                setLoading(false)
            }
            catch(error){
                console.error("Error fetching the listings: ", error);
                setError(true);
            }
        };
        fetchListings();
    }, []);

    if (loading) return <p>loading...</p>;
    if (error) return <p>error</p>;
    return (
        <>
            <h3>Your Listings</h3>
            
            <div className="listings">
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <div className='listing'>
                            <h4>{listing.title}</h4>
                            <p>{listing.description}</p>
                            <p>{listing.price}</p>
                            <p>{listing.location}</p>
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