import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], listings: [] });

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 0) {
                const response = await axios.get(`http://localhost:8000/api/search?query=${query}`);
                console.log(response.data);
                setResults(response.data);
            } else {
                setResults({ users: [], listings: [] });
            }
        };

        const debounceFetch = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceFetch);
    }, [query]);

    return (
        <div className='search'>
            <input 
                type="search"
                name="form"
                className="search_input"
                placeholder='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <div className="search-results">
                    <ul className='results-list'>
                        {results.users.map(user => (
                            <li className="result" key={user.id}>
                                <Link className='result-link' to={`/profile/${user.user_id}`}>
                                    <img src={`http://localhost:8000/api/instrument_swap_media/images/${user.username}.jpg`} alt={""} />
                                    <p>{user.username}</p>
                                </Link>
                            </li>
                        ))}
                        {results.listings.map(listing => (
                            <li className="result" key={listing.id}>
                                <Link className='result-link' to={`/listings/${listing.id}`}>
                                    <img src={`http://localhost:8000/api/instrument_swap_media/images/${listing.image}/`} alt={listing.title} />
                                    <p>{listing.title}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
