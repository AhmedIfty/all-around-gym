import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.scss';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    // Function to handle the search
    const handleSearch = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get(`http://localhost:5000/search?term=${encodeURIComponent(searchTerm)}`);
        setResults(response.data);
    } catch (error) {
        console.error('Error fetching search results:', error);
        if (error.response && error.response.status === 404) {
        setResults([]); // Set empty results if no matches are found
        }
    }
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSearch} className="search-bar">
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="search-results">
                {results.map((item, index) => (
                    <div key={index} className="result-item">
                    {/* Check if the user has exercises */}
                    {item.exercises && item.exercises.length > 0 ? (
                        <div>
                        <p><strong>User:</strong> {item.username || 'No username'}</p>
                        <ul>
                            {item.exercises.map((exercise, exIndex) => (
                            <li key={exIndex}>
                                <p>{exercise.exerciseName || 'No exercise name'} - {exercise.sets} Sets, {exercise.reps} Reps</p>
                            </li>
                            ))}
                        </ul>
                        </div>
                    ) : (
                        <p>No exercises found for this user.</p>
                    )}
                    </div>
                ))}
                </div>

        </div>
    );
};

export default SearchBar;
