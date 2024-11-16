import React from 'react';
import Photo from './Photo';

const PhotoList = ({ photos, title }) => {
  return <div className="photo-container">
    <h2>{title}</h2>
    <ul>
      {/* Render photo components or show "not found" message */}
      {photos.length > 0 ? (
        photos.map((photo) => <Photo key={photo.id} photo={photo} />)
      ) : (
        <li className="not-found">
          <h3>No Results Found</h3>
          <p>Your search did not return any results. Please try again.</p>
        </li>
      )}
    </ul>
  </div>
}

export default PhotoList;

