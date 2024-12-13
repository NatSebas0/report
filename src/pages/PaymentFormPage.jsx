import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export default function PaymentFormPage() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState(null);

  const [name, setName] = useState(currentUser.username || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    const auctions = getLocalStorage('auctions') || [];
    const foundAuction = auctions.find(a => a.id === parseInt(id));
    if (foundAuction && foundAuction.winner && foundAuction.winner.email === currentUser.email && !foundAuction.isPaid) {
      setAuction(foundAuction);
    } else {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar datos mínimos
    if (!name || !email || !address || !city || !country || !zip || !cardNumber || !expiry || !cvc) {
      alert('Por favor, completa todos los campos del formulario de pago.');
      return;
    }

    // Simular pago
    const auctions = getLocalStorage('auctions') || [];
    const updatedAuctions = auctions.map(a => {
      if (a.id === auction.id) {
        return { ...a, isPaid: true };
      }
      return a;
    });
    setLocalStorage('auctions', updatedAuctions);

    alert('Pago realizado exitosamente! Te llegará un correo con los detalles del envío.');
    navigate(`/auction/${auction.id}`);
  };

  if (!auction) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-xl mx-auto px-4 py-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Completar Pago</h2>
          <p className="text-gray-600 mb-6">
            Has ganado la subasta <strong>{auction.title}</strong> con una puja final de ${auction.currentBid}.
            Por favor, ingresa tus datos de envío y pago para completar la compra.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Datos del Comprador</h3>
              <Input label="Nombre Completo" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Dirección" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              <Input label="Ciudad" type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
              <Input label="País" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
              <Input label="Código Postal" type="text" value={zip} onChange={(e) => setZip(e.target.value)} required />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información de Pago</h3>
              <Input 
                label="Número de Tarjeta"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <div className="flex space-x-4">
                <Input
                  label="Fecha de Expiración (MM/YY)"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
                <Input
                  label="CVC"
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Pagar Ahora
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
