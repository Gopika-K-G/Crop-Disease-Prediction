import React from 'react';
import { Link } from 'react-router-dom';
import './CropLibrary.css';

const crops = [
  { id: 1, name: 'Wheat', image: 'https://images.pexels.com/photos/265278/pexels-photo-265278.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, name: 'Corn', image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, name: 'Rice', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

function CropLibrary() {
  return (
    <div className="crop-library-container">
      <h2>Crop Library</h2>
      <div className="crop-grid">
        {crops.map((crop) => (
          <Link key={crop.id} to={`/crop-library/${crop.id}`} className="crop-card">
            <img src={crop.image} alt={crop.name} />
            <h3>{crop.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CropLibrary;
