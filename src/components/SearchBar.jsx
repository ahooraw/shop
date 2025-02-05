import React from 'react';

function SearchBar({ searchQuery, onSearch, className = "" }) {
  return (
    <div className={`search-bar ${className}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search products..."
      />
    </div>
  );
}

export default SearchBar;