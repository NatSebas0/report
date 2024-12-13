import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import { getLocalStorage } from '../utils/localStorage';
import { Link } from 'react-router-dom';
import Categories, { CATEGORIES } from '../components/Categories';

export default function SearchResultsPage() {
  const auctions = getLocalStorage('auctions') || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredAuctions, setFilteredAuctions] = useState(auctions);

  useEffect(() => {
    let result = auctions;
    if (searchQuery.trim() !== '') {
      result = result.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory) {
      result = result.filter(a => a.category === selectedCategory);
    }
    setFilteredAuctions(result);
  }, [searchQuery, selectedCategory, auctions]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros */}
            <div className="lg:w-64 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2 text-emerald-600" /> Filtros
                </h3>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="absolute top-2 right-3 text-gray-400">
                    <i className="fa fa-search"></i>
                  </span>
                </div>

                <Categories onSelectCategory={(cat) => setSelectedCategory(cat)} />
              </div>
            </div>

            {/* Resultados */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <h2 className="text-xl font-semibold mb-4 sm:mb-0">
                    Resultados de búsqueda
                  </h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-emerald-500">
                      <option>Más relevantes</option>
                      <option>Precio: Menor a mayor</option>
                      <option>Precio: Mayor a menor</option>
                      <option>Finaliza pronto</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuctions.length > 0 ? filteredAuctions.map((auction) => (
                  <div
                    key={auction.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg"
                  >
                    <img
                      src={auction.images[0]}
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-gray-800">{auction.title}</h3>
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
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500">No se encontraron resultados</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
