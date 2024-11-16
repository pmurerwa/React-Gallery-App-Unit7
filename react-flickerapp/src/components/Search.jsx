import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Search component that captures user input and triggers a search
const Search = ({onSearch}) => {
  const [query, setQuery] = useState(''); // Local state for search input
  const navigate = useNavigate();  // Hook for programmatic navigation

    // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload 
    onSearch(query); // Calls the fetchData function with the search term
    navigate(`/search/${query}`); // Updates the URL to match the search term
    //e.currentTarget.reset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
// 