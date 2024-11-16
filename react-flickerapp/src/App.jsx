import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import apiKey from './config';  //Import API key configuration

//App components
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';

const App = () => {  // State for storing photos and loading status
    // State for storing photos and loading status
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Function to fetch data from the Flickr API
  const fetchData = (query) => {
    // Construct the API URL dynamically based on query
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
    
    setLoading(true); // Display loading indicator
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.photos.photo); // Store retrieved photos in state
        setLoading(false); // Remove loading indicator
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };


  //when the path changes, this will trigger fetchData
  useEffect(() => {
    const path = location.pathname;
    if (path === '/cats') {
      fetchData('cats');
    } else if (path === '/dogs') {
      fetchData('dogs');
    } else if (path === '/computers') {
      fetchData('computers');
    } else if (path.startsWith('/search/')) {
      const query = path.replace('/search/', '');
      fetchData(query);
    }

  }, [location.pathname]); 

  //My routes
  return ( 
    <div className="container">
      <Search onSearch={fetchData} />
      <Nav /> {/* Navigation and Search components visible on all pages */}
      {loading ? <p>Loading...</p> : null}
      <Routes>
         {/* Redirect root to /cats */}
        <Route path="/" element={<Navigate to="/cats"  />} />
         {/* Static routes for predefined categories */}
        <Route path="/cats" element={<PhotoList photos={photos} title="Cats" />} />
        <Route path="/dogs" element={<PhotoList photos={photos} title="Dogs" />} />
        <Route path="/computers" element={<PhotoList photos={photos} title="Computers" />} />
         {/* Dynamic route for search results */}
        <Route path="/search/:query" element={<PhotoList photos={photos} title="Search Results" />} />
        <Route path="*" element={<h2>404-Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App
