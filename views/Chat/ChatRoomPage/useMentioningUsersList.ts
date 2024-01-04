import { UsersListForMentioning, useChatContext } from "context/Chat/chat";
import useChatApi from "hooks/apiHooks/Chat/useChatApi";
import { useEffect } from "react";

type ReturnType = {
  usersList: UsersListForMentioning[];
};

export const useMentioningUsersList = (chatRoomId: string): ReturnType => {
  const chat = useChatContext();

  const usersList = chat.getMentionsUsersListSelector;

  const { getChatRoomMentionsApi } = useChatApi();

  useEffect(() => {
    if (chatRoomId) {
      getChatRoomMentionsApi({ chatRoomId });
    }
  }, [chatRoomId]);

  return {
    usersList,
  };
};
