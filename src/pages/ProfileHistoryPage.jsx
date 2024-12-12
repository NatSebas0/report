// src/pages/ProfileHistoryPage.jsx
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage } from '../utils/localStorage';

export default function ProfileHistoryPage() {
  const { currentUser } = useContext(AuthContext);
  const auctions = getLocalStorage('auctions') || [];

  // Encontrar todas las pujas realizadas por el usuario
  let userBids = [];
  auctions.forEach(a => {
    a.bids.forEach(bid => {
      if (bid.bidder.email === currentUser.email) {
        userBids.push({
          auctionTitle: a.title,
          date: bid.timestamp,
          amount: bid.amount,
          won: a.currentBid === bid.amount && new Date(a.endTime) < new Date()
        });
      }
    });
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Historial de Pujas</h2>
          <div className="bg-white rounded-lg shadow p-6">
            {userBids.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Ítem</th>
                    <th className="pb-4">Fecha</th>
                    <th className="pb-4">Monto</th>
                    <th className="pb-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {userBids.map((b, i) => (
                    <tr key={i}>
                      <td className="py-4">{b.auctionTitle}</td>
                      <td className="py-4">{new Date(b.date).toLocaleString()}</td>
                      <td className="py-4">${b.amount.toLocaleString()}</td>
                      <td className="py-4">
                        {b.won ? (
                          <span className="px-2 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">
                            Ganada
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-700">
                            Pendiente / Superado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No has realizado pujas aún.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
