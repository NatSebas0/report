// src/pages/AuctionDetailPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { increment } = useNotificationStore();
  const [isWatching, setIsWatching] = useState(false);
  const [auction, setAuction] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const auctions = getLocalStorage('auctions') || [];
    const foundAuction = auctions.find(a => a.id === parseInt(id));
    if (foundAuction) {
      setAuction(foundAuction);
      calculateTimeLeft(foundAuction.endTime);
      incrementViewerCount(foundAuction.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (auction && new Date() > new Date(auction.endTime) && !auction.winner) {
      determineWinner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction]);

  const calculateTimeLeft = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) {
      setTimeLeft('Subasta finalizada');
      return;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    
    // Actualizar cada segundo
    setTimeout(() => calculateTimeLeft(endTime), 1000);
  };

  // Ajusta la función incrementViewerCount así:
const incrementViewerCount = (auctionId) => {
    const auctions = getLocalStorage('auctions') || [];
    const updatedAuctions = auctions.map(a => {
      if (a.id === auctionId) {
        return { ...a, viewerCount: a.viewerCount + 1 };
      }
      return a;
    });
    setLocalStorage('auctions', updatedAuctions);
    
    // Reobtener la subasta actualizada
    const updatedAuction = updatedAuctions.find(a => a.id === auctionId);
    if (updatedAuction) {
      setAuction(updatedAuction);
    }
  };
  

  const determineWinner = () => {
    if (auction.bids.length === 0) return;
    const sortedBids = [...auction.bids].sort((a, b) => b.amount - a.amount);
    const highestBid = sortedBids[0];
    const updatedAuctions = getLocalStorage('auctions').map(a => {
      if (a.id === auction.id) {
        return {
          ...a,
          winner: highestBid.bidder,
          paymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días para pagar
        };
      }
      return a;
    });
    setLocalStorage('auctions', updatedAuctions);
    setAuction({
      ...auction,
      winner: highestBid.bidder,
      paymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    });
    // Notificar al ganador
    increment();
    alert(`¡Felicidades ${highestBid.bidder.name}! Has ganado la subasta "${auction.title}". Por favor, realiza el pago antes del ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleString()}.`);
    navigate(`/checkout/${auction.id}`);
  };

  const handlePlaceBid = (amount) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para pujar.');
      return;
    }

    if (auction && new Date() > new Date(auction.endTime)) {
      alert('La subasta ha finalizado.');
      return;
    }

    if (amount < auction.minimumBid) {
      alert(`La puja mínima debe ser de $${auction.minimumBid.toLocaleString()}`);
      return;
    }

    const newBid = {
      id: Date.now(),
      bidder: {
        id: currentUser.id,
        name: currentUser.username,
        email: currentUser.email
      },
      amount,
      timestamp: new Date().toISOString()
    };

    const updatedAuctions = getLocalStorage('auctions').map(a => {
      if (a.id === auction.id) {
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
    setAuction({
      ...auction,
      currentBid: amount,
      minimumBid: amount + 100,
      bids: [newBid, ...auction.bids]
    });

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
                timeLeft={timeLeft}
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

                {auction.winner && (
                  <div className="p-4 bg-yellow-50 rounded-lg flex items-start">
                    <span className="p-1 rounded-full bg-yellow-100">
                      <span className="sr-only">Notificación</span>
                    </span>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Has ganado esta subasta. Completa el pago antes del {new Date(auction.paymentDeadline).toLocaleString()}.
                      </p>
                    </div>
                  </div>
                )}

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
