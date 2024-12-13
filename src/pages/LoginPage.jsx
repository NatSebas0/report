// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { getLocalStorage } from '../utils/localStorage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Si manejas contraseñas

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getLocalStorage('users') || [];
    const user = users.find(user => user.email === email);
    if (user) {
      // Aquí deberías verificar la contraseña si la tienes
      login(user);
      navigate('/home');
    } else {
      alert('Usuario no encontrado');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h2>
            <p className="mt-2 text-gray-600">Inicia sesión en tu cuenta</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                label="Correo electrónico"
                type="text"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <Link to="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Iniciar Sesión
            </Button>

            <p className="text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
