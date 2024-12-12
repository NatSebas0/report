// src/components/auction/AuctionImageGallery.jsx
import React, { useState } from 'react';

export default function AuctionImageGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt="Imagen principal de la subasta"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
              mainImage === image ? 'ring-2 ring-emerald-500' : ''
            }`}
          >
            <img
              src={image}
              alt={`Subasta imagen ${index + 1}`}
              className="w-full h-full object-cover hover:opacity-75 transition-opacity"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
