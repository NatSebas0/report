// src/pages/ProfileSettingsPage.jsx
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettingsPage() {
  const { currentUser, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState(currentUser.username);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [email, setEmail] = useState(currentUser.email); // En caso de permitir cambiar email

  const handleUpdate = (e) => {
    e.preventDefault();
    const users = getLocalStorage('users') || [];
    const updatedUsers = users.map(u => {
      if (u.email === currentUser.email) {
        return { ...u, username, avatar };
      }
      return u;
    });
    setLocalStorage('users', updatedUsers);
    login({ ...currentUser, username, avatar });
    alert('Perfil actualizado con éxito');
    navigate('/profile');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Configuración de Perfil</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              label="Nombre de Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Correo Electrónico"
              type="email"
              value={email}
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Avatar
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="https://ejemplo.com/avatar.jpg"
              />
              {avatar && <img src={avatar} alt="Avatar" className="h-16 w-16 rounded-full mt-2" />}
            </div>
            <Button type="submit" className="w-full">
              Guardar Cambios
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
