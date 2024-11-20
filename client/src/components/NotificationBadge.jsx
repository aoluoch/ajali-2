import { Bell } from 'lucide-react';

const NotificationBadge = () => {
  // Static unread count as we don't have NotificationContext
  const unreadCount = 3;  // You can adjust this number manually for testing

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
