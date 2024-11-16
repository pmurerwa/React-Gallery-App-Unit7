import React from 'react';

const Photo = ({ photo }) => {
  const src = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  return (
    <li>
      <img src={src} alt={photo.title || 'Flickr Photo'} />
    </li>
  );
};

export default Photo;


// Photo component that displays an image with a unique key and src generated from Flickr 
// const Photo = (photo) => {
//   const { farm, server, id, secret } = photo;
//   const src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
//     return (
//       <li>
//         <img src={src} alt="" />
//       </li>
//     );
    
// }
// export default Photo;