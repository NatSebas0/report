// src/pages/CheckoutPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { AuthContext } from '../contexts/AuthContext';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const { currentUser } = useContext(AuthContext);

  // Campos del formulario
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  
  // Datos de la tarjeta
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auctions = getLocalStorage('auctions') || [];
    const foundAuction = auctions.find(a => a.id === parseInt(id));
    if (foundAuction && foundAuction.winner && foundAuction.winner.email === currentUser.email && !foundAuction.isPaid) {
      setAuction(foundAuction);
    } else {
      // Si no se cumplen las condiciones, redirigir a home
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validaciones simples del formulario
    if (!fullName || !address || !city || !postalCode || !country) {
      alert('Por favor completa todos los datos de envío.');
      return;
    }

    if (!cardNumber || !expiry || !cvc) {
      alert('Por favor completa los datos de la tarjeta.');
      return;
    }

    setLoading(true);

    // Simular proceso de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Actualizar la subasta como pagada
    const auctions = getLocalStorage('auctions') || [];
    const updatedAuctions = auctions.map(a => {
      if (a.id === auction.id) {
        return { ...a, isPaid: true };
      }
      return a;
    });
    setLocalStorage('auctions', updatedAuctions);

    setLoading(false);
    alert('Pago realizado exitosamente. En breve recibirás un correo con los detalles del envío.');
    navigate(`/auction/${auction.id}`);
  };

  if (!auction) {
    return null; // Mientras carga o si no encuentra la subasta
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Completa tu Pago</h2>
          <p className="text-gray-600 mb-6">
            Has ganado la subasta <strong>{auction.title}</strong>. Por favor, completa tus datos de envío y tu información de pago para finalizar la compra.
          </p>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información de Envío</h3>
              <Input
                label="Nombre Completo"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="Dirección"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Input
                label="Ciudad"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <Input
                label="Código Postal"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <Input
                label="País"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Información de Pago</h3>
              <Input
                label="Número de Tarjeta"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiración (MM/YY)"
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  label="CVC"
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Procesando...' : 'Pagar Ahora'}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Al completar el pago, recibirás un correo con la información del envío.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
