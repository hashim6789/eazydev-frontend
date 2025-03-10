// src/hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

interface EventHandler {
  event: string;
  handler: (...args: any[]) => void;
}

interface UseSocketProps {
  url: string;
  namespace: string;
  auth?: any;
  eventHandlers: EventHandler[];
  dependencies?: any[];
}

const useSocket = ({
  url,
  namespace,
  auth,
  eventHandlers,
  dependencies = [],
}: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (dependencies.some((dep) => dep === undefined)) {
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io(`${url}${namespace}`, { auth });

      // Register event handlers
      eventHandlers.forEach(({ event, handler }) => {
        socketRef.current?.on(event, handler);
        console.log(`Listening for ${event} event`);
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected");
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      eventHandlers.forEach(({ event }) => {
        socketRef.current?.off(event);
      });
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [url, namespace, auth, ...dependencies]);

  return socketRef.current;
};

export default useSocket;
