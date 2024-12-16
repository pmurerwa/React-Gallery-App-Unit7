import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import apiKey from './config';  //Import API key 

//App components
import Search from './components/Search'; // Search component that captures user input and triggers a search
import Nav from './components/Nav'; // Nav component with links to static topics
import PhotoList from './components/PhotoList'; // that renders all the Photo components.

//These states are used to store photos and handle loading indicators.
const App = () => {  
  const [photos, setPhotos] = useState([]); //state that Stores the array of photo data fetched from Flickr API.
  const [loading, setLoading] = useState(false);  //state that Indicates whether data is currently being fetched.
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
        console.error("Error fetching data :", error);
        setLoading(false);
      });
  };


  //The useEffect hook watches for changes in location.pathname (from useLocation).
  //Whenever the user navigates to a new route, this hook is triggered.
  //Can use swtich, or map 
  useEffect(() => {
    const path = location.pathname;
    //Static Routes Matches predefined categories ((/cats, /dogs, /computers)and triggers a call to fetchData with the corresponding tag 
    if (path === '/cats') {
      fetchData('cats');
    } else if (path === '/dogs') {
      fetchData('dogs');
    } else if (path === '/computers') {
      fetchData('computers');
    } else if (path.startsWith('/search/')) { //Identifies routes starting with /search/.
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
