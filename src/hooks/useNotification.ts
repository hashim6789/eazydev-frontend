import { useState, useEffect } from "react";
import io from "socket.io-client";
import { api, config } from "../configs";
import { Notification } from "../types";

const socket = io(config.API_BASE_URL, {
  transports: ["websocket"],
  upgrade: false,
});

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get<Notification[]>(`/api/notify`);
        if (response && response.data) {
          setNotifications(response.data);
        }
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    socket.emit("joinRoom", userId);

    socket.on("receiveNotification", (notification: Notification) => {
      setUnreadCount((prevCount) => prevCount + 1);
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [userId]);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAllAsRead,
  };
};
