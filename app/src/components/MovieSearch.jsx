import React, { useState } from 'react';

const MovieSearch = ({ onMovieSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b5dd3f40`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Search && data.Search.length > 0) {
                    setSearchResults(data.Search);
                } else {
                    setSearchResults([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setSearchResults([]);
            });
    };

    const handleMovieSelect = (selectedMovie) => {
        onMovieSelect(selectedMovie);
        setSearchResults([]); // Clear search results after selecting a movie
        setSearchTerm(''); // Clear search term
    };

    return (
        <div className="movie-search">
            <input
                type="text"
                placeholder="Search For New Movie"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearchClick();
                    }
                }}
            />
            <button type="button" onClick={handleSearchClick}>
                Search
            </button>

            <ul className='movieList'>
                {searchResults.map((result) => (
                    <li className='movies' key={result.imdbID} onClick={() => handleMovieSelect(result)}>
                        {result.Title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieSearch;