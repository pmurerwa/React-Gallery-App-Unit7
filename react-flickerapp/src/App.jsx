import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';


import apiKey from './config';
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchData = (query) => {
    setLoading(true);
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.photos.photo);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

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

  // useEffect(() => {
  //   fetchData('/cats')
  // }, []);

  return ( 
    <div className="container">
      <Search onSearch={fetchData} />
      <Nav />
      {loading ? <p>Loading...</p> : null}
      <Routes>
        <Route path="/" element={<Navigate to="/cats"  />} />
        <Route path="/cats" element={<PhotoList photos={photos} title="Cats" />} />
        <Route path="/dogs" element={<PhotoList photos={photos} title="Dogs" />} />
        <Route path="/computers" element={<PhotoList photos={photos} title="Computers" />} />
        <Route path="/search/:query" element={<PhotoList photos={photos} title="Search Results" />} />
        <Route path="*" element={<h2>404-Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App
