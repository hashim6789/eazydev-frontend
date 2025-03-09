import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import io from "socket.io-client";
import { api } from "../../../configs";
import { Notification } from "../../../types";

interface NotificationPanelProps {
  userId: string;
}

// Connect to the Socket.io server
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  upgrade: false,
});

const NotificationPanel: React.FC<NotificationPanelProps> = ({ userId }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/api/notify`);
        if (response && response.data) {
          const result = response.data;
          setNotifications(result.data);
        }
      } catch (error) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    // Mentor joins their respective room
    socket.emit("joinRoom", userId);

    // Listen for 'receiveNotification' events
    socket.on("receiveNotification", (notification: Notification) => {
      setCount((prev) => prev + 1);
      console.log("Received notification: ", notification);
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("receiveNotification");
    };
  }, [userId]);

  const handleShowNotification = () => {
    setCount(0);
    setShowNotification(!showNotification);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => handleShowNotification()}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {/* {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )} */}
        {count > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {count}
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
