// src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Star, Package, History, CreditCard, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage } from '../utils/localStorage';

export default function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const auctions = getLocalStorage('auctions') || [];
  const userAuctions = auctions.filter(a => a.seller.email === currentUser.email);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="text-center">
                  <img
                    src={currentUser.avatar || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="h-24 w-24 rounded-full mx-auto"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{currentUser.username}</h2>
                  <p className="text-gray-500">Miembro desde {new Date().getFullYear()}</p>
                </div>

                <div className="flex justify-center">
                  <div className="text-center mx-4">
                    <p className="font-semibold text-emerald-600">4.9</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                  <div className="text-center mx-4">
                    <p className="font-semibold text-emerald-600">{userAuctions.length}</p>
                    <p className="text-sm text-gray-500">Subastas</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 bg-emerald-50 rounded-lg">
                    <Package className="h-5 w-5 mr-3 text-emerald-600" />
                    Mis Subastas
                  </Link>
                  <Link to="/profile/payments" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                    Métodos de Pago
                  </Link>
                  <Link to="/profile/notifications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Bell className="h-5 w-5 mr-3 text-gray-400" />
                    Notificaciones
                  </Link>
                  <Link to="/profile/history" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <History className="h-5 w-5 mr-3 text-gray-400" />
                    Historial
                  </Link>
                  <Link to="/profile/favorites" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Star className="h-5 w-5 mr-3 text-gray-400" />
                    Favoritos
                  </Link>
                  <Link to="/profile/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Settings className="h-5 w-5 mr-3 text-gray-400" />
                    Configuración
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Mis Subastas Activas</h3>
                </div>
                <div className="p-6">
                  {userAuctions.length > 0 ? (
                    <div className="space-y-4">
                      {userAuctions.map((auction) => (
                        <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <img
                              src={auction.images[0]}
                              alt={auction.title}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold">{auction.title}</h4>
                              <p className="text-sm text-gray-500">Puja actual: ${auction.currentBid}</p>
                            </div>
                          </div>
                          <Link to={`/auction/${auction.id}`}>
                            <Button variant="outline" size="sm">
                              Ver Detalles
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No tienes subastas activas.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
