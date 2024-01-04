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

export const useChatMessages = (roomId: string): UseChatMessagesReturn => {
  const profile = useProfileContext();
  const chat = useChatContext();

  const page = useRef<number>(0);
  const hasAllLoaded = useRef<boolean>(false);
  const profileId = profile.profileDetails?.profileId;
  const chatList = chat.getChatListSelector();
  const chatMessagesLenght = chat.chatList.length;
  const isLoading = chat.isFetching;

  useEffect(() => {
    chat.setChatPageNo(page.current);
    chat.setChatRoomId(roomId);
  }, [page, roomId]);

  const { getChatRoomMessageApi } = useChatApi();

  const loadMoreMessageList = useCallback(() => {
    if (chatMessagesLenght < LOAD_LIMIT - 1 || isLoading) return;
    if (profileId && !hasAllLoaded.current) {
      getChatRoomMessageApi({
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
      getChatRoomMessageApi({
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
