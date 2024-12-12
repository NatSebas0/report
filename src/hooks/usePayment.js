// src/hooks/usePayment.js
import { useState } from 'react';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async ({ amount, currency, paymentMethodId }) => {
    setLoading(true);
    setError(null);
    try {
      // Simular una llamada a una API de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Aquí integrarías Stripe u otro proveedor de pagos
      resolve();
    } catch (err) {
      setError('Error en el procesamiento del pago.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
};

export default usePayment;
