// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories, { CATEGORIES } from '../components/Categories';
import FeaturedAuctions from '../components/FeaturedAuctions';
import { getLocalStorage } from '../utils/localStorage';

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const storedAuctions = getLocalStorage('auctions') || [];
    setAuctions(storedAuctions);
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredAuctions = selectedCategory
    ? auctions.filter(a => a.category === selectedCategory)
    : auctions;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">
                Descubre Tesoros Únicos en Subastas Online
              </h1>
              <p className="text-lg text-purple-100 mb-8">
                Participa en subastas emocionantes y encuentra piezas exclusivas 
                desde la comodidad de tu hogar.
              </p>
              <a href="/search" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explorar Subastas
              </a>
            </div>
          </div>
        </div>
        
        <Categories onSelectCategory={handleSelectCategory} />
        <FeaturedAuctions auctions={filteredAuctions} />
      </main>
      <Footer />
    </div>
  );
}
