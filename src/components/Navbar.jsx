// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gavel, User, Bell, Search } from 'lucide-react';
import Button from './ui/Button';
import NotificationDropdown from './notifications/NotificationDropdown';
import { AuthContext } from '../contexts/AuthContext';
import { getUnreadCount } from '../utils/notificationUtils';

export default function Navbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const unreadCountReal = currentUser ? getUnreadCount(currentUser.email) : 0;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Gavel className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">AUCTIONVIBE</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar subastas..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6 text-gray-600" />
                {unreadCountReal > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCountReal}
                  </span>
                )}
              </button>
              {showNotifications && <NotificationDropdown />}
            </div>
            <div className="relative group">
              <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-6 w-6 text-gray-600" />
              </Link>
              <div className="absolute right-0 w-48 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi Perfil
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cerrar Sesión
                </button>
              </div>
            </div>
            <Link to="/create-auction">
              <Button>
                Crear Subasta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
