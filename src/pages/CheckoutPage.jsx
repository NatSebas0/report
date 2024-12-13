// src/pages/CheckoutPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = React.useState(null);

  useEffect(() => {
    const auctions = getLocalStorage('auctions') || [];
    const foundAuction = auctions.find(a => a.id === parseInt(id));
    if (foundAuction && foundAuction.winner && !foundAuction.isPaid) {
      setAuction(foundAuction);
    } else {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlePayment = () => {
    const auctions = getLocalStorage('auctions') || [];
    const updatedAuctions = auctions.map(a => {
      if (a.id === auction.id) {
        return { ...a, isPaid: true };
      }
      return a;
    });
    setLocalStorage('auctions', updatedAuctions);
    alert('Pago realizado exitosamente!');
    navigate(`/auction/${auction.id}`);
  };

  if (!auction) {
    return null; // O un indicador de carga
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Completa tu Pago</h2>
          <p className="text-gray-600 mb-6">
            Has ganado la subasta <strong>{auction.title}</strong>. Por favor, realiza el pago para completar tu compra.
          </p>
          {/* Aquí podrías integrar una pasarela de pagos real */}
          <Button onClick={handlePayment} className="w-full">
            Simular Pago
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
