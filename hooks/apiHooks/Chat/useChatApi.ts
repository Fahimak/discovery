"use client";
import api from "api";
import { getFeedApi } from "api/actions/Feed/feed";
import {
  ChatBotRespModel,
  ChatRoomsByChannelModel,
  GetChatMessageRequestData,
  GetChatRoomDetailData,
  MessageDataResponse,
  SendMessageRequestBody,
} from "api/models/Chat/chat";
import { AxiosProgressEvent } from "axios";
import { ChatContextProps, useChatContext } from "context/Chat/chat";
import { useChatRoomsContext } from "context/Chat/chatroom";
import { useFeedContext } from "context/Feed/feed";
import { useHiveContext } from "context/Hive/hive";

export const useChatApi = () => {
  const chat = useChatContext();
  const chatRooms = useChatRoomsContext();

  const hive = useHiveContext();

  const getChatRoomDetailByIdApi = async (passedId: string) => {
    chat.setIsFetching(true);
    try {
      const data = await api.chat.getChatRoomDetailById({
        chatRoomId: passedId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        chatRooms.setChatRoomDetail(data.data.data);
      } else {
      }
    } catch {}
    chat.setIsFetching(false);
  };

  const sendAttachmentApi = async (passedData: {
    body: FormData;
    cb?: HandlePropgressCb<AxiosProgressEvent>;
    abortSignal?: AbortSignal;
  }) => {
    chat.setIsFetchingSendMessage(true);
    try {
      const data = await api.chat.sendAttachmentFile(
        passedData.body,
        passedData.cb,
        passedData.abortSignal
      );

      if (data.data.responseInfo.httpCode === 200) {
        chat.setIsFetchingSendMessage(false);
      } else {
      }
    } catch {}
    chat.setIsFetchingSendMessage(false);
  };

  const sendVoiceApi = async (body: FormData) => {
    chat.setIsFetchingSendMessage(true);
    try {
      const data = await api.chat.sendVoice(body);

      if (data.data.responseInfo.httpCode === 200) {
        chat.setIsFetchingSendMessage(false);
      } else {
      }
    } catch {}
    chat.setIsFetchingSendMessage(false);
  };

  const sendChatMessageApi = async (body: SendMessageRequestBody) => {
    chat.setIsFetchingSendMessage(true);
    try {
      const data = await api.chat.sendMessage(body);

      if (data.data.responseInfo.httpCode === 200) {
        chat.setIsFetchingSendMessage(false);
      } else {
      }
    } catch {}
    chat.setIsFetchingSendMessage(false);
  };

  const getChatRoomMessageApi = async (
    body: GetChatMessageRequestData
  ): Promise<MessageDataResponse[]> => {
    chat.setIsFetching(true);
    try {
      const data = await api.chat.getMessagesOfChantRoom(body);

      if (data.data.responseInfo.httpCode === 200) {
        console.log(data.data.data);
        chat.setChatList(data.data.data);
        chat.setIsFetching(false);
        return data.data.data;
      } else {
        chat.setIsFetching(false);
        return [];
      }
    } catch {
      chat.setIsFetching(false);
      return [];
    }
  };

  const getChatBotRoomMessageApi = async (
    body: GetChatMessageRequestData
  ): Promise<ChatBotRespModel[]> => {
    chat.setIsFetching(true);
    try {
      const data = await api.chat.getMessagesOfChatBotRoom(body);

      if (data.data.responseInfo.httpCode === 200) {
        chat.setChatList(data.data.data);
        chat.setIsFetching(false);
        return data.data.data;
      } else {
        chat.setIsFetching(false);
        return [];
      }
    } catch {
      chat.setIsFetching(false);
      return [];
    }
  };

  const getChatRoomMentionsApi = async (body: GetChatRoomDetailData) => {
    chat.setIsFetching(true);
    try {
      const data = await api.chat.getChannelUsersListMentions(body);

      if (data.data.responseInfo.httpCode === 200) {
        chat.setMentionsUsersList(data.data.data);
        chat.setIsFetching(false);
        return data.data.data;
      } else {
        chat.setIsFetching(false);
        return [];
      }
    } catch {
      chat.setIsFetching(false);
      return [];
    }
  };

  const setFilteredChatRooms = (data: ChatRoomsByChannelModel[]) => {
    data.map((channel, idx) => {
      return channel.chatRoomList.map((room, idx) => {
        return chatRooms.filteredChatroomsByChannels.push({
          id: room._id,
          title: room.chatRoomName,
          description: room.chatRoomBio,
          isPinned: false,
          logo: channel.channelLogo,
          onlineCount: room.activeUsers?.length,
        });
      });
    });
  };

  const getChatRoomsByChannelApi = async (body: { organizationId: number }) => {
    chat.setIsFetching(true);
    try {
      const data = await api.chat.chatRoomsByChannel(body);

      if (data.data.responseInfo.httpCode === 200) {
        chatRooms.setChatRoomsByChannels(data.data.data);
        setFilteredChatRooms(data.data.data);
        chat.setIsFetching(false);
        return data.data.data;
      } else {
        chat.setIsFetching(false);
        return [];
      }
    } catch {
      chat.setIsFetching(false);
      return [];
    }
  };

  return {
    getChatRoomDetailByIdApi,
    sendAttachmentApi,
    sendVoiceApi,
    sendChatMessageApi,
    getChatRoomMessageApi,
    getChatBotRoomMessageApi,
    getChatRoomMentionsApi,
    getChatRoomsByChannelApi,
  };
};

export default useChatApi;
