import { useCallback, useEffect, useRef } from "react";
import { AxiosProgressEvent } from "axios";

import IslandLayout from "components/IslandLayout";
import { useChatContext } from "context/Chat/chat";
import { useChatRoomsContext } from "context/Chat/chatroom";
import { useProfileContext } from "context/Profile/profile";
import { useHiveContext } from "context/Hive/hive";
import { useChatMessages } from "./useChatMessages";
import { useMentioningUsersList } from "./useMentioningUsersList";
import { useSearchMe } from "./useSearchMe";
import Chat from "components/Chat";
import useChatApi from "hooks/apiHooks/Chat/useChatApi";
import { useChatsSocket } from "services/socket";

type AvailableFormDataKeys =
  | "chatRoomId"
  | "message"
  | "userName"
  | "organizationUuid"
  | "file"
  | "fileName"
  | "type"
  | "mentionUsersIds";
interface TypedFormData extends FormData {
  append(
    name: AvailableFormDataKeys,
    value: string | Blob,
    fileName?: string
  ): void;
}

interface Props {
  roomId: string;
}

const ChatRoom = ({ roomId }: Props) => {
  const chat = useChatContext();
  const chatRoom = useChatRoomsContext();

  const profile = useProfileContext();

  const hive = useHiveContext();

  const roomName = chatRoom;
  const userId = profile.userId;
  const userName = profile.userName;
  const organizationUuid = hive.hiveUuid;
  const isLoadingAttachment = chat.isFetchingSendMessage;

  const { loadMoreMessageList, chatList, isLoading } = useChatMessages(roomId);
  const { usersList } = useMentioningUsersList(roomId);
  const {
    isShowSearchControls,
    closeSearchControls,
    chatListWithMention,
    detectSearchSymbol,
    chatListWithMentionLength,
  } = useSearchMe(roomId, userId);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { sendAttachmentApi, sendVoiceApi, sendChatMessageApi } = useChatApi();

  const handleSendMessage = useCallback(
    async ({
      content = "",
      file,
      type = "attachment",
      cb,
      abortSignal,
      mentionUsersIds = [],
    }: SendMessageParams<AxiosProgressEvent, AbortSignal>) => {
      if (roomId && userId) {
        if (file) {
          const formData = new FormData() as TypedFormData;
          formData.append("chatRoomId", roomId);
          formData.append("message", content);
          formData.append("userName", userName);
          formData.append("organizationUuid", organizationUuid);
          formData.append("file", file as File);
          formData.append("fileName", file.name);
          if (type === "voice") {
            formData.append("type", "voice");
            sendVoiceApi(formData);
          }
          if (type === "attachment") {
            formData.append("type", "attachment");
            formData.append("mentionUsersIds", JSON.stringify(mentionUsersIds));
            await sendAttachmentApi({ body: formData, cb, abortSignal });
            // .unwrap()
            // .catch((error) => {
            //   throw error;
            // });
          }
        } else {
          sendChatMessageApi({
            chatRoomId: roomId,
            message: content,
            type: "text",
            userId,
            userName,
            mentionUsersIds,
          });
        }
      }
      // if (chatContainerRef.current) {
      //   chatContainerRef.current.scrollTop =
      //     chatContainerRef.current.scrollHeight;
      // }
    },
    [organizationUuid, roomId, userId, userName]
  );

  // useEffect(() => {
  //   // Scroll to the bottom of the chat container on initial load and when chatList changes
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = 1000;
  //   }
  // }, [chatList]);

  return (
    <div className="chat_room_wrapper" ref={chatContainerRef}>
      <IslandLayout>
        <div className="chat_room_container">
          {/* <NavigationSections roomName={roomName} /> */}
          {/* <PageLayout sideMenu={false}> */}
          {/* <PageLayout className="chat_room_page"> */}
          <Chat
            handlePagginationUpdate={loadMoreMessageList}
            sendMessage={handleSendMessage}
            loading={isLoading}
            chatList={
              isShowSearchControls && chatListWithMention.length
                ? chatListWithMention
                : chatList
            }
            usersList={usersList}
            loadingAttachment={isLoadingAttachment}
            isShowSearchControls={isShowSearchControls}
            detectSearchSymbol={detectSearchSymbol}
            closeSearchControls={closeSearchControls}
            searchMentionMessagesCount={chatListWithMentionLength}
            chatRoomId={roomId}
          />
        </div>
        {/* </PageLayout> */}
      </IslandLayout>
    </div>
  );
};

export default ChatRoom;
