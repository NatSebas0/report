// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="mt-4 text-lg text-gray-600">Página no encontrada.</p>
          <Link to="/home" className="mt-6 inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700">
            Volver al Inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
