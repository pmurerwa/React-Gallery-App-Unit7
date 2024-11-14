import { useState, useEffect } from 'react'
import './App.css'

import apiKey from './config';
import Search from './components/Search';
import Nav from './components/Nav';

function App() {
  const [photos, setPhotos] = useState(0)

  useEffect(() => {
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=landscape&format=json&nojsoncallback=1`
    )
      .then(response => response.json())  
      .then(data => {
        setPhotos(data.photos.photo);  
      })
      .catch(error => {
        console.error("Error fetching data:", error); 
      });
  }, []);
  console.log(photos);

  return (
    <>
      
    </>
  )
}

export default App
