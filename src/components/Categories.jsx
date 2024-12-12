// src/components/Categories.jsx
import React from 'react';
import { Camera, Watch, Palette, Car, Diamond, Book, Music, Trophy } from 'lucide-react';

export const CATEGORIES = [
  { icon: Camera, name: "Fotografía" },
  { icon: Watch, name: "Relojes" },
  { icon: Palette, name: "Arte" },
  { icon: Car, name: "Vehículos" },
  { icon: Diamond, name: "Joyas" },
  { icon: Book, name: "Libros" },
  { icon: Music, name: "Música" },
  { icon: Trophy, name: "Coleccionables" }
];

export default function Categories({ onSelectCategory }) {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((Category, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onClick={() => onSelectCategory(Category.name)}
            >
              <Category.icon className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm text-gray-700">{Category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
