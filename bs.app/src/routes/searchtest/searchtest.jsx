import React from 'react';
import SearchBar from '../../Components/search/searchBar'; // Adjust the import path if necessary
import './searchtest.scss';

const SearchTest = () => {
  return (
    <div className="search-page">
      <h1>Search Page</h1>
      <div className="search-bar">
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchTest;