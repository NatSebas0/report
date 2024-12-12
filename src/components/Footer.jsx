// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        © {new Date().getFullYear()} AUCTIONVIBE. Todos los derechos reservados.
      </div>
    </footer>
  );
}
