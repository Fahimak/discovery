import { useEffect } from "react";

import Loader from "components/common/Loader";
import { useChatContext } from "context/Chat/chat";
import useChatApi from "hooks/apiHooks/Chat/useChatApi";
import ChatRoom from "../ChatRoomPage/ChatRoomPage";

interface Props {
  roomId: string;
}

const ChatRoomDetail = ({ roomId }: Props) => {
  const chat = useChatContext();

  const { getChatRoomDetailByIdApi } = useChatApi();

  useEffect(() => {
    if (roomId) {
      getChatRoomDetailByIdApi(roomId);
    }

    return () => {
      chat.clearChatMessage();
    };
  }, [roomId]);

  return (
    <>
      <ChatRoom roomId={roomId} />
      <LoaderIndicator />
    </>
  );
};

const LoaderIndicator = () => {
  const chat = useChatContext();
  const isFetching = chat.isFetching;
  return isFetching ? <Loader /> : null;
};

export default ChatRoomDetail;
