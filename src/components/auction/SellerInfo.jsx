// src/components/auction/SellerInfo.jsx
import React from 'react';
import { Star } from 'lucide-react';

export default function SellerInfo({ seller }) {
  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold mb-4">Información del Vendedor</h3>
      <div className="flex items-start space-x-4">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{seller.name}</p>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm">{seller.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Miembro desde {seller.memberSince} • {seller.totalSales} ventas exitosas
          </p>
        </div>
      </div>
    </div>
  );
}
