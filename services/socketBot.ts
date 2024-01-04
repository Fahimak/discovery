import { useChatContext } from "context/Chat/chat";
import { useProfileContext } from "context/Profile/profile";
import { useEffect, useState, useCallback } from "react";

import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;

interface UseSocketReturn {
  isConnected: boolean;
}

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnectionDelay: 10000,
});

export const useChatsBotSocket = (roomId: string): UseSocketReturn => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const profile = useProfileContext();

  const userId = profile.userId; ///1746 the mock id

  const chat = useChatContext();

  const handleGetMessage = useCallback(
    (newMessage: any) => {
      chat.addNewBotMessage(newMessage.message);
    },
    [chat]
  );

  useEffect(() => {
    if (!socket.connected) {
      // console.log("chat room connecting");
      socket.connect();
    }

    socket.on("connect", () => {
      // console.log("chat room connected");

      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      // console.log("chat room disconnected");
      setIsConnected(socket.connected);
    });
    return () => {
      // console.log("chat room disconnect");
      socket.off("connect");
      socket.off("disconnect");
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (isConnected && roomId) {
      // console.log("Subscribe: ", roomId, userId);
      socket.emit("subscribesupport", {
        chatRoomId: roomId,
        userId: userId,
        sessionId: localStorage.getItem("chatSessionId") || "",
      });

      socket.on("message", handleGetMessage);
    }

    return () => {
      if (isConnected && roomId) {
        // console.log("Unsubscribe: ", isConnected, roomId, userId);
        socket.off("message");
        socket.emit("unsubscribesupport", {
          chatRoomId: roomId,
          userId: userId,
          sessionId: localStorage.getItem("chatSessionId") || "",
        });
      }
    };
  }, [roomId, isConnected, userId, handleGetMessage]);

  return {
    isConnected,
  };
};
