import { ChatItem, useChatContext } from "context/Chat/chat";
import { useProfileContext } from "context/Profile/profile";
import useChatApi from "hooks/apiHooks/Chat/useChatApi";
import { useEffect, useRef, useCallback } from "react";

const LOAD_LIMIT = 30;

interface UseChatMessagesReturn {
  loadMoreMessageList: () => void;
  chatList: ChatItem[];
  isLoading: boolean;
}

export const useChatBotMessages = (roomId: string): UseChatMessagesReturn => {
  const profile = useProfileContext();
  const chat = useChatContext();

  const page = useRef<number>(0);
  const hasAllLoaded = useRef<boolean>(false);
  const profileId = profile.profileDetails?.profileId;
  const chatList = chat.getChatBotListSelector();
  const chatMessagesLenght = chat.chatList.length;
  const isLoading = chat.isFetching;

  const { getChatBotRoomMessageApi } = useChatApi();

  const loadMoreMessageList = useCallback(() => {
    if (chatMessagesLenght < LOAD_LIMIT - 1 || isLoading) return;
    if (profileId && !hasAllLoaded.current) {
      getChatBotRoomMessageApi({
        chatRoomId: roomId,
        userId: profileId,
        page: page.current + 1,
        limit: LOAD_LIMIT,
      }).then((res) => {
        if (res.length) {
          page.current = page.current + 1;
        } else {
          hasAllLoaded.current = true;
        }
      });
    }
  }, [chatMessagesLenght, isLoading, profileId, roomId]);

  useEffect(() => {
    if (roomId && profileId && !page.current) {
      getChatBotRoomMessageApi({
        chatRoomId: roomId,
        userId: profileId,
        page: page.current,
        limit: LOAD_LIMIT,
      });
    }
    return () => {
      page.current = 0;
    };
  }, [roomId, profileId]);

  return { loadMoreMessageList, chatList, isLoading };
};
