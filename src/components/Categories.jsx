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
        <select
          className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map((Category, index) => (
            <option key={index} value={Category.name}>
              {Category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
