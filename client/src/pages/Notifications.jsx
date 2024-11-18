import { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';

const Notifications = () => {
  // Sample static notifications data, replace this with dynamic data as needed
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'success', message: 'Your profile has been updated successfully.' },
    { id: '2', type: 'error', message: 'Failed to update your password.' },
    { id: '3', type: 'success', message: 'You have a new message.' },
  ]);
  const [filter, setFilter] = useState('all');

  const removeNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification =>
    filter === 'all' || notification.type === filter
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100'
            }`}
          >
            Success
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'error' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            Error
          </button>
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
          <p className="mt-2 text-gray-500">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between p-4 rounded-lg ${
                notification.type === 'success' ? 'bg-green-50' :
                notification.type === 'error' ? 'bg-red-50' :
                'bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                {notification.type === 'success' ? (
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <Bell className="h-5 w-5 text-red-500 mt-0.5" />
                )}
                <div>
                  <p className={`font-medium ${
                    notification.type === 'success' ? 'text-green-800' :
                    notification.type === 'error' ? 'text-red-800' :
                    'text-gray-800'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.id).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
