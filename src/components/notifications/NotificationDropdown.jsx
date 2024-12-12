// src/components/notifications/NotificationDropdown.jsx
import React from 'react';
import { Bell, DollarSign, Package, AlertCircle } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';

export default function NotificationDropdown() {
  const { reset } = useNotificationStore();

  const notifications = [
    {
      id: '1',
      type: 'bid',
      message: 'Nueva puja en tu subasta "Reloj Vintage"',
      time: 'Hace 5 minutos',
      read: false
    },
    {
      id: '2',
      type: 'win',
      message: '¡Felicidades! Ganaste la subasta "Cámara Leica"',
      time: 'Hace 2 horas',
      read: false
    },
    {
      id: '3',
      type: 'outbid',
      message: 'Te han superado en la subasta "Pintura Arte Moderno"',
      time: 'Hace 3 horas',
      read: true
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'bid':
        return <DollarSign className="h-5 w-5 text-emerald-500" />;
      case 'win':
        return <Package className="h-5 w-5 text-emerald-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notificaciones</h3>
          <button onClick={() => reset()} className="text-sm text-emerald-600 hover:text-emerald-700">
            Marcar todo como leído
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 ${
              !notification.read ? 'bg-emerald-50' : ''
            }`}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <button className="text-sm text-emerald-600 hover:text-emerald-700 w-full text-center">
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
}
