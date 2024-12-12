// src/pages/CheckoutPage.jsx
import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import usePayment from '../hooks/usePayment';

export default function CheckoutPage() {
  const { handlePayment, loading, error } = usePayment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí podrías obtener los datos del formulario
    try {
      await handlePayment({
        amount: 2675, // Monto total de la compra
        currency: 'USD',
        paymentMethodId: 'pm_card_visa', // Este valor vendría de Stripe Elements en producción
      });
      alert('Pago realizado exitosamente!');
      // Redirigir o realizar otras acciones
    } catch (err) {
      alert('Error en el procesamiento del pago.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resumen de compra */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen de la Subasta</h2>
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1524592094714-0f0654e20314"
                    alt="Product"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">Reloj Vintage de Colección</h3>
                    <p className="text-sm text-gray-500">Subasta ganada el 15 de marzo, 2024</p>
                    <p className="text-lg font-bold text-emerald-600 mt-2">$2,675.00</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Información de Pago</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Input
                        label="Número de tarjeta"
                        placeholder="1234 5678 9012 3456"
                        icon={<CreditCard />}
                        required
                      />
                    </div>
                    <Input
                      label="Fecha de expiración"
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      icon={<Lock />}
                      required
                    />
                  </div>
                  <Input
                    label="Nombre en la tarjeta"
                    placeholder="NOMBRE APELLIDO"
                    required
                  />
                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Pagar ahora'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Resumen de costos */}
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Resumen</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio de subasta</span>
                  <span>$2,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comisión de la plataforma</span>
                  <span>$125.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>$50.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>$2,675.00</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6">
                Pagar ahora
              </Button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Pago seguro procesado por Stripe
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
