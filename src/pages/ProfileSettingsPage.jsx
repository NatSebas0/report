// src/pages/ProfileSettingsPage.jsx
import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

export default function ProfileSettingsPage() {
  const { currentUser, login } = useContext(AuthContext);
  const [username, setUsername] = useState(currentUser.username);
  const [avatar, setAvatar] = useState(currentUser.avatar);

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
              label="URL de Avatar"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            {avatar && <img src={avatar} alt="Avatar" className="h-16 w-16 rounded-full" />}
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
