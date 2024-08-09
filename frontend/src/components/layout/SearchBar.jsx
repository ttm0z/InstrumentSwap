import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchBar.css'
const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState({users:[], listings:[]})

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 0) {
                const response = await axios.get(`http://localhost:8000/api/search?query=${query}`)
                console.log(response.data)                
                setResults(response.data);
            }
            else{
                setResults({users:[], listings:[]});
            }
        };

        const debounceFetch = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceFetch)
    }, [query])

    return (
        <div className='search'>
            <input 
                type="search"
                name="form"
                className="search_input"
                placeholder='search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <div className="search-results">
                    <ul>
                        {results.users.map(user => {
                            
                            <li key={user.user_id}>
                                <Link to={`/profile/${user.user_id}`}>{user.username}</Link>
                            </li>
                        })}
                        {results.listings.map(listing => (
                            
                            <li key={listing.id}>
                                
                                
                                <Link to={`/listings/${listing.id}`}><img src={`http://localhost:8000/api/instrument_swap_media/images/${listing.image}/`} />{listing.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
export default SearchBar