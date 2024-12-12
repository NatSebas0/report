// src/pages/CreateAuctionPage.jsx
import React, { useState, useContext } from 'react';
import { Upload, Clock, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export default function CreateAuctionPage() {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageUrls]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !price || !duration || !category || images.length === 0) {
      alert('Por favor, completa todos los campos y sube al menos una imagen.');
      return;
    }

    const newAuction = {
      id: Date.now(),
      title,
      description,
      currentBid: parseFloat(price),
      minimumBid: parseFloat(price) + 100,
      endTime: new Date(Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000),
      viewerCount: 0,
      images,
      seller: {
        name: currentUser.username,
        avatar: currentUser.avatar || 'https://via.placeholder.com/150',
        rating: 4.5, // Valor predeterminado
        memberSince: '2024',
        totalSales: 0
      },
      bids: []
    };

    const auctions = getLocalStorage('auctions') || [];
    setLocalStorage('auctions', [newAuction, ...auctions]);

    alert('Subasta creada exitosamente!');
    // Redirigir a la página de inicio o a la página de la subasta
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">Crear Nueva Subasta</h1>
              <p className="text-gray-600 mt-1">Completa los detalles de tu subasta</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <Input
                  label="Título de la subasta"
                  type="text"
                  placeholder="Ej: Reloj de Colección Vintage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Describe tu artículo en detalle..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Precio inicial ($)"
                    type="number"
                    placeholder="0.00"
                    icon={<Tag />}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                  <Input
                    label="Duración (días)"
                    type="number"
                    placeholder="7"
                    icon={<Clock />}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imágenes
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                    required
                  />
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {images.map((img, index) => (
                        <img key={index} src={img} alt={`Subasta Imágen ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    <option>Arte</option>
                    <option>Coleccionables</option>
                    <option>Electrónica</option>
                    <option>Joyería</option>
                    <option>Relojes</option>
                    <option>Fotografía</option>
                    <option>Vehículos</option>
                    <option>Libros</option>
                    <option>Música</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancelar</Button>
                <Button type="submit">Publicar Subasta</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
