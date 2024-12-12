// src/components/auction/BiddingBox.jsx
import React, { useState } from 'react';
import { Clock, Eye, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { formatDistance } from '../../utils/dateUtils';

export default function BiddingBox({
  currentBid,
  minimumBid,
  endTime,
  viewerCount,
  onPlaceBid,
}) {
  const [bidAmount, setBidAmount] = useState(minimumBid);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bidAmount < minimumBid) {
      setError(`La puja mínima debe ser de $${minimumBid.toLocaleString()}`);
      return;
    }
    onPlaceBid(bidAmount);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Puja actual</p>
          <p className="text-3xl font-bold text-emerald-600">
            ${currentBid.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-orange-500 mb-1">
            <Clock className="h-5 w-5 mr-1" />
            <span>
              {new Date(endTime).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span className="text-sm">{viewerCount} personas viendo</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ingresa tu puja"
            min={minimumBid}
            step="100"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Hacer Puja
        </Button>

        {error && (
          <div className="p-4 bg-red-50 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="p-4 bg-orange-50 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-700">
            La puja mínima debe ser de ${minimumBid.toLocaleString()} (incremento de $100)
          </p>
        </div>
      </form>
    </div>
  );
}
