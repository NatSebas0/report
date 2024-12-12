// src/pages/AuctionDetailPage.jsx
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuctionImageGallery from '../components/auction/AuctionImageGallery';
import BiddingBox from '../components/auction/BiddingBox';
import BidHistory from '../components/auction/BidHistory';
import SellerInfo from '../components/auction/SellerInfo';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { useNotificationStore } from '../stores/notificationStore';

export default function AuctionDetailPage() {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { increment } = useNotificationStore();
  const [isWatching, setIsWatching] = useState(false);
  
  const auctions = getLocalStorage('auctions') || [];
  const auction = auctions.find(a => a.id === parseInt(id));

  const handlePlaceBid = (amount) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para pujar.');
      return;
    }

    const updatedAuctions = auctions.map(a => {
      if (a.id === parseInt(id)) {
        const newBid = {
          id: Date.now(),
          amount,
          bidder: {
            name: currentUser.username,
            avatar: currentUser.avatar || 'https://via.placeholder.com/150'
          },
          timestamp: new Date()
        };
        return {
          ...a,
          currentBid: amount,
          minimumBid: amount + 100,
          bids: [newBid, ...a.bids]
        };
      }
      return a;
    });

    setLocalStorage('auctions', updatedAuctions);
    increment();
    alert('Puja realizada exitosamente!');
  };

  if (!auction) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <h2 className="text-2xl font-semibold">Subasta no encontrada.</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div>
              <AuctionImageGallery images={auction.images} />
            </div>

            {/* Right Column - Auction Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">{auction.title}</h1>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsWatching(!isWatching)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        isWatching ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Share2 className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <BiddingBox
                currentBid={auction.currentBid}
                minimumBid={auction.minimumBid}
                endTime={auction.endTime}
                viewerCount={auction.viewerCount}
                onPlaceBid={handlePlaceBid}
              />

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {auction.description}
                  </p>
                </div>

                <SellerInfo seller={auction.seller} />
              </div>

              <BidHistory bids={auction.bids} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
