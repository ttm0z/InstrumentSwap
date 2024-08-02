import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8000'
});

/** Fetch all listings
 * 
 * @returns json listings object
 */
export const fetchAllListings = () => {
    console.log("Fetching all listings");
    return api.get('/api/listings/getAll/');
};


/**Fetch listings by category
 * 
 * @param {*} category 
 * @returns 
 */
export const fetchListingsByCategory = (category) => {
    console.log("Fetching listings of category", category);
    return api.get(`/api/listings/getByCategory/${category}/`);
}

/**Fetch listings by id
 * 
 * @param {*} category 
 * @returns 
 */
export const fetchListingsById = (user_id) => {
    console.log("Fetching listings of userid", user_id);
    return api.get(`/api/listings/getById/${user_id}/`);
}

/**Fetch listings by id
 * 
 * @param {*} category 
 * @returns 
 */
export const deleteListing = (listing_id) => {
    console.log("deleting listing", listing_id);
    return api.delete(`/api/listings/${listing_id}/`);
}
