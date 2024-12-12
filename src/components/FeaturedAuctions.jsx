// src/components/FeaturedAuctions.jsx
import React from 'react';
import { Heart, Clock } from 'lucide-react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

export default function FeaturedAuctions({ auctions }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Subastas Destacadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.length > 0 ? auctions.map((auction) => (
          <div key={auction.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={auction.images[0]}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{auction.title}</h3>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-500">Puja actual</p>
                  <p className="text-lg font-bold text-emerald-600">${auction.currentBid}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{auction.bids.length} pujas</p>
                  <div className="flex items-center text-orange-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{"falta tiempo"}</span>
                  </div>
                </div>
              </div>
              <Link to={`/auction/${auction.id}`}>
                <Button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Ver Detalles
                </Button>
              </Link>
            </div>
          </div>
        )) : (
          <p>No hay subastas disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
