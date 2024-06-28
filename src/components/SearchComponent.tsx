import React from 'react';
import useSearch from '../hooks/useSearch';

const SearchComponent = () => {
    const { searchTerm, year, handleSearch } = useSearch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search term"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value, year)}
            />
            <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => handleSearch(searchTerm, e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchComponent;
