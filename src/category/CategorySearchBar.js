import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategorySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // useNavigate hook for redirection

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [category, ...queryParts] = searchQuery.trim().split(' ');
      const searchTerm = queryParts.join(' ');

      if (!['restaurant', 'beauty_parlour', 'hotels'].includes(category)) {
        alert('Invalid category. Use "restaurant" or "beauty_parlour"');
        return;
      }

      const url = searchTerm
        ? `http://localhost:30000/api/${category}?query=${encodeURIComponent(searchTerm)}`
        : `http://localhost:30000/api/${category}`;

      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {
        // Redirect to the results page and pass the data in the state
        navigate('/categorysearchresults', { state: { results: response.data } });
      } else {
        setError('No results found');
      }
    } catch (error) {
      console.error('Error searching:', error);
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mb-3">
      <div className="d-flex flex-column flex-md-row align-items-center">
        {/* Search Input and Button in a Single Row */}
        <div className="input-group mb-6 flex-grow-1 mx-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search for nagpur's businesses category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-primary mx-2"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default CategorySearchBar;
