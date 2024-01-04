"use client";
import { useEffect, useRef } from "react";
import { useChatsSocket } from "services/socket";
import ChatRoomDetail from "views/Chat/ChatRoomDetail";
import { useChatMessages } from "views/Chat/ChatRoomPage/useChatMessages";
import ChatRoomsPage from "views/Chat/ChatRoomsPage/ChatRoomsPage";

export default async function Page({ params }: { params: { roomId: string } }) {
  const { chatList } = useChatMessages(params.roomId);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollChatToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useChatsSocket(params.roomId);

  useEffect(() => {
    // Scroll to the bottom of the chat container on initial load and when chatList changes
    scrollChatToBottom();
  }, [chatList]);

  return (
    <div className="col-span-3" ref={chatContainerRef}>
      <ChatRoomDetail roomId={params.roomId} />
    </div>
  );
}
