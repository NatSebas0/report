// src/components/auction/BidHistory.jsx
import React from 'react';
import { formatDistance } from '../../utils/dateUtils';

export default function BidHistory({ bids }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Historial de Pujas</h3>
      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center space-x-3">
              <img
                src={bid.bidder.avatar}
                alt={bid.bidder.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{bid.bidder.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDistance(bid.timestamp)} atrás
                </p>
              </div>
            </div>
            <span className="font-semibold text-emerald-600">
              ${bid.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
    