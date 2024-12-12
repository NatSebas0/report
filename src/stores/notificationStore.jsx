// src/stores/notificationStore.js
import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  unreadCount: 2, // Puedes actualizar este valor dinámicamente
  increment: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  reset: () => set({ unreadCount: 0 }),
}));
