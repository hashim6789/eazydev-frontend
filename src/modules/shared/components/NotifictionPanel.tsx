import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../../../hooks/useNotification";

interface NotificationPanelProps {
  userId: string;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ userId }) => {
  const [showNotification, setShowNotification] = useState(false);
  const { notifications, loading, error, unreadCount, markAllAsRead } =
    useNotifications(userId);

  const toggleNotificationPanel = () => {
    if (!showNotification) {
      markAllAsRead();
    }
    setShowNotification(!showNotification);
  };

  if (loading) return <div>Loading...</div>;
  //   if (error) return <div>{error}</div>;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={toggleNotificationPanel}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {showNotification && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 font-medium mb-2">No notifications</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
