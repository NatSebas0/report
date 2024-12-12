// src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState(''); // Si manejas contraseñas
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const users = getLocalStorage('users') || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert('El correo electrónico ya está registrado');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      avatar: avatar ? URL.createObjectURL(avatar) : '',
      subastasCreadas: [],
      subastasGanadas: [],
      // password, // Aquí podrías almacenar una versión hasheada de la contraseña
    };
    registerUser(newUser);
    navigate('/home');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Crear una cuenta</h2>
            <p className="mt-2 text-gray-600">Únete a nuestra comunidad de subastas</p>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                placeholder="Juan Pérez"
                icon={<User />}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="tu@email.com"
                icon={<Mail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                icon={<Lock />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                placeholder="••••••••"
                icon={<Lock />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Acepto los términos y condiciones
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Registrarse
            </Button>

            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
