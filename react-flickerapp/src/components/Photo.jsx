import React from 'react';

const Photo = ({ photo }) => {
  const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  return (
    <li>
      <img src={url} alt={photo.title || 'Flickr Photo'} /> {/* Render the photo */}
    </li>
  );
};

export default Photo;

