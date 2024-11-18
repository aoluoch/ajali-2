import { Bell } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const NotificationBadge = () => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;