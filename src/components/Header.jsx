import React from 'react';
import SearchBar from './SearchBar';

function Header({ searchQuery, onSearch }) {
  return (
    <header className="header">
      <h1>My Store</h1>
      <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
    </header>
  );
}

export default Header;
