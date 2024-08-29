import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchBar.css';
import { SearchOutlined } from '@mui/icons-material';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], listings: [] });

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length > 0) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/search?query=${query}`);
                    console.log(response.data);
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setResults({ users: [], listings: [] });
            }
        };

        const debounceFetch = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounceFetch);
    }, [query]);

    // Calculate relevance score
    const calculateRelevance = (item) => {
        const queryLower = query.toLowerCase();
        const titleLower = (item.username || item.title || '').toLowerCase();
        const index = titleLower.indexOf(queryLower);

        if (index === -1) return 0; // No match

        // Score based on the position of the match
        // Lower index means higher relevance
        return Math.max(0, 100 - index);
    };

    // Combine and sort results by relevance
    const combinedResults = [
        ...results.users.map(user => ({
            type: 'user',
            id: user.id,
            username: user.username,
            image: `http://localhost:8000/api/instrument_swap_media/images/${user.username}.jpg`,
            link: `/profile/${user.user_id}`
        })),
        ...results.listings.map(listing => ({
            type: 'listing',
            id: listing.id,
            title: listing.title,
            image: `http://localhost:8000/api/instrument_swap_media/images/${listing.image}/`,
            link: `/listings/${listing.id}`
        }))
    ].sort((a, b) => calculateRelevance(b) - calculateRelevance(a)); // Sort by relevance

    return (
        <div className='search'>
            <div className='search-bar'>
            <SearchOutlined />
            <input 
                type="search"
                name="form"
                className="search_input"
                placeholder='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            </div>
            
            {query && (
                <div className="search-results">
                    <ul className='results-list'>
                        {combinedResults.map(result => (
                            <li className="result" key={result.id}>
                                <Link className='result-link' to={result.link}>
                                    <img src={result.image} alt={result.type === 'user' ? result.username : result.title} />
                                    <p>{result.type === 'user' ? result.username : result.title}</p>
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
