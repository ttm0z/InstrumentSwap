import {useState, useEffect, useCallback} from 'react';
import { fetchAllListings, fetchListingsByCategory, fetchListingsByUserId } from '../services/listingService';

const useListings = (category=null, user_id=null, sortOption=null) => {
    console.log("UL sort option: ", sortOption)
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchListings = useCallback(async() => {
        try{
            let response;
            if (category) {
                response = await fetchListingsByCategory(category, sortOption);
                console.log(response.data)
            }
            else if (user_id){
                response = await fetchListingsByUserId(user_id, sortOption)
            }
            else{
                response = await fetchAllListings(sortOption)
            }
            setListings(response.data);
        }
        catch(error){
            setError(error);
        } 
        finally{
            setLoading(false);
        }
    }, [category, user_id]);


    useEffect(() => {
        fetchListings();
    }, [fetchListings])
        
    return {listings, loading, error, refetch: fetchListings};
};
export default useListings;