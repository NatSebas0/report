// src/utils/auctionUtils.js
import { getLocalStorage, setLocalStorage } from './localStorage';
import { addNotification } from './notificationUtils';

export const endAuctionEarly = (auctionId, currentUser) => {
  const auctions = getLocalStorage('auctions') || [];
  const auction = auctions.find(a => a.id === auctionId);

  if (!auction) return;

  // Verificar que el currentUser es el seller
  if (auction.seller.email !== currentUser.email) {
    alert('No tienes permiso para terminar esta subasta.');
    return;
  }

  // Determinar ganador si hay pujas
  let updatedAuction = { ...auction };
  if (auction.bids.length > 0) {
    const sortedBids = [...auction.bids].sort((a, b) => b.amount - a.amount);
    const highestBid = sortedBids[0];
    updatedAuction = {
      ...updatedAuction,
      winner: highestBid.bidder,
      paymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 días para pagar
    };

    addNotification({
        type: 'alert',
        message: `Has terminado anticipadamente la subasta "${auction.title}".`,
        time: 'Ahora mismo',
        read: false,
        userEmail: currentUser.email
      });
  } else {
    // No hay pujas, simplemente se deja sin ganador
    updatedAuction = {
      ...updatedAuction,
      winner: null,
      paymentDeadline: null
    };
  }

  // Actualizar la subasta en localStorage
  const updatedAuctions = auctions.map(a => a.id === auctionId ? updatedAuction : a);
  setLocalStorage('auctions', updatedAuctions);

  alert('Subasta terminada exitosamente.');
};
