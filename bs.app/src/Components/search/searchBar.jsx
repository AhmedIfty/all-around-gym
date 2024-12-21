import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.scss';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    property: '',
    minPrice: '',
    maxPrice: '',
    bedroom: '',
  });

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

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
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
        <div className="filters">
          <div className="item">
            <label htmlFor="city">Location</label>
            <input
              type="text"
              id="city"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="City Location"
            />
          </div>
          <div className="item">
            <label htmlFor="type">Type</label>
            <select name="type" id="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select name="property" id="property" value={filters.property} onChange={handleFilterChange}>
              <option value="">Any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Any"
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Any"
            />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedrooms</label>
            <input
              type="number"
              id="bedroom"
              name="bedroom"
              value={filters.bedroom}
              onChange={handleFilterChange}
              placeholder="Any"
            />
          </div>
        </div>
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