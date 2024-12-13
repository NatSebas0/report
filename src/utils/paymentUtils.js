import { getLocalStorage, setLocalStorage } from './localStorage';
export const checkPaymentDeadlines = () => {
    const auctions = getLocalStorage('auctions') || [];
    const now = new Date();
  
    const updatedAuctions = auctions.map(a => {
      if (a.winner && !a.isPaid && new Date(a.paymentDeadline) < now) {
        // Si la subasta no ha sido pagada a tiempo
        // Buscar el siguiente mejor postor
        const sortedBids = [...a.bids].sort((x, y) => y.amount - x.amount);
        const nextBid = sortedBids.find(bid => bid.bidder.email !== a.winner.email);
        
        if (nextBid) {
          return {
            ...a,
            winner: nextBid.bidder,
            currentBid: nextBid.amount,
            minimumBid: nextBid.amount + 100,
            paymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Nuevo plazo
            isPaid: false
          };
        } else {
          // No hay otros postores, marcar como no vendido
          return {
            ...a,
            winner: null,
            paymentDeadline: null,
            isPaid: false
          };
        }
      }
      return a;
    });
  
    setLocalStorage('auctions', updatedAuctions);
  };
  