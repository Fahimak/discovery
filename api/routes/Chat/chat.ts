import { AxiosInstance, AxiosProgressEvent, AxiosPromise } from "axios";

import BaseApi from "api/base";

import { BaseResponse } from "../../models/base";
import {
  MessageDataResponse,
  ListChatRoomsOfUserRequestData,
  ChatRoom,
  UpdateRoomNameData,
  UpdateRoomBioData,
  GetChatRoomDetailData,
  RemoveUsersFromChatsRoomData,
  UsersListOfChatRoomDataRequest,
  GetChatMessageRequestData,
  CreateChatRoomRequestBody,
  SendMessageRequestBody,
  PinningChatRoomRequestBody,
  SendAttachmentResponce,
  GetChatMessagesWithUserMentionsRequestData,
  GetVideoCommentViewerMessagesRequestBody,
  SendViewerTextMessageRequestBody,
  GetVideoRoomsByOwnerRequestData,
  CommentsRoomResponse,
  VideoComment,
  GetOwnerVideoRoomsResponse,
  GetVideoMessagesByOwnerRequestData,
  SendMessagesByOwnerRequestData,
  ChatRoomsByChannelModel,
  ChatBotRespModel,
  SendMessageBotRequestBody,
} from "../../models/Chat/chat";

import { ProfileItem } from "api/models/Profile/profile";

export class ChatApi extends BaseApi {
  getUsersListOfChatRoom(
    data: GetChatRoomDetailData
  ): AxiosPromise<BaseResponse<ProfileItem[]>> {
    return this.request({
      url: `${this.url}/app/room/users`,
      method: "post",
      data,
    });
  }

  getListChatRoomsOfUser(
    data: ListChatRoomsOfUserRequestData
  ): AxiosPromise<BaseResponse<ChatRoom[]>> {
    return this.request({
      url: `${this.url}/app/room/list`,
      method: "POST",
      data,
    });
  }

  getChatRoomDetailById(
    data: GetChatRoomDetailData
  ): AxiosPromise<BaseResponse<ChatRoom>> {
    return this.request({
      url: `${this.url}/app/room/get`,
      method: "POST",
      data,
    });
  }

  getChatBotId(data: {
    organizationId: number;
    organizationUuid: string;
    sessionId?: string;
  }): AxiosPromise<BaseResponse<string>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "unAuth/"
      }support/room/get`,
      method: "POST",
      data,
    });
  }

  chatUpdateRoomName(data: UpdateRoomNameData): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/app/room/update/name`,
      method: "POST",
      data,
    });
  }

  chatUpdateRoomBio(data: UpdateRoomBioData): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/app/room/update/bio`,
      method: "POST",
      data,
    });
  }

  chatUpdateRoomLogo(data: FormData): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/app/room/update/logo`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=---BOUNDARY",
      },
      data,
    });
  }

  removeUsersFromChatRooms(
    data: RemoveUsersFromChatsRoomData
  ): AxiosPromise<BaseResponse<UniqueId>> {
    return this.request({
      url: `${this.url}/app/room/remove/users`,
      method: "POST",
      data,
    });
  }

  getUsersForCreateChatRoom(
    data: UsersListOfChatRoomDataRequest
  ): AxiosPromise<BaseResponse> {
    return this.request({
      url: `/v1/admin/get/channel/users`,
      method: "POST",
      data,
    });
  }

  getMessagesOfChantRoom(
    data: GetChatMessageRequestData
  ): AxiosPromise<BaseResponse<MessageDataResponse[]>> {
    return this.request({
      url: `${this.url}/app/room/get/messages`,
      method: "POST",
      data,
    });
  }

  deleteMessage(data: {
    messageId: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/app/room/delete/message`,
      method: "POST",
      data,
    });
  }

  getMessagesOfChatBotRoom(
    data: GetChatMessageRequestData
  ): AxiosPromise<BaseResponse<ChatBotRespModel[]>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "unAuth/"
      }support/room/get/message`,
      method: "POST",
      data,
    });
  }

  getChatMessagesWithUserMentions(
    data: GetChatMessagesWithUserMentionsRequestData
  ): AxiosPromise<BaseResponse<MessageDataResponse[]>> {
    return this.request({
      url: `${this.url}/app/room/get/mention/messages`,
      method: "POST",
      data,
    });
  }

  createChatRoom(data: CreateChatRoomRequestBody): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/app/room/create`,
      method: "POST",
      data,
    });
  }

  sendMessage(
    data: SendMessageRequestBody
  ): AxiosPromise<BaseResponse<MessageDataResponse>> {
    return this.request({
      url: `${this.url}/app/room/send/message`,
      method: "POST",
      data,
    });
  }

  sendChatBotMessage(
    data: SendMessageBotRequestBody
  ): AxiosPromise<BaseResponse<MessageDataResponse>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "unAuth/"
      }support/room/send/message`,
      method: "POST",
      data,
    });
  }

  pinningChatRoom(
    data: PinningChatRoomRequestBody
  ): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/app/room/pinning`,
      method: "POST",
      data,
    });
  }

  unpinningChatRoom(
    data: PinningChatRoomRequestBody
  ): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/app/room/unpinning`,
      method: "POST",
      data,
    });
  }

  sendAttachmentFile(
    data: FormData,
    cb?: (e: AxiosProgressEvent) => void,
    cancelSignal?: AbortSignal
  ): AxiosPromise<BaseResponse<SendAttachmentResponce>> {
    return this.request({
      url: `${this.url}/app/room/send/attachment`,
      method: "POST",
      data,
      onUploadProgress: cb,
      timeout: 0,
      signal: cancelSignal,
    });
  }

  sendVoice(
    data: FormData
  ): AxiosPromise<BaseResponse<SendAttachmentResponce>> {
    return this.request({
      url: `${this.url}/app/room/send/voice`,
      method: "POST",
      data,
      timeout: 0,
    });
  }

  getChannelUsersListMentions(data: GetChatRoomDetailData): AxiosPromise<
    BaseResponse<
      {
        profilePhoto: string;
        createdDate: string;
        user: UserName;
        userName: UserName;
        userId: UserId;
        channelId: number;
        status: string;
      }[]
    >
  > {
    return this.request({
      url: `${this.url}/app/room/users/list`,
      method: "POST",
      data,
    });
  }

  getVideoCommentViewerMessages(
    data: GetVideoCommentViewerMessagesRequestBody
  ): AxiosPromise<BaseResponse<CommentsRoomResponse>> {
    return this.request({
      url: `${this.url}/video/room/get/viewer/message`,
      method: "POST",
      data,
    });
  }

  sendViewerTextMessages(
    data: SendViewerTextMessageRequestBody
  ): AxiosPromise<BaseResponse<VideoComment>> {
    return this.request({
      url: `${this.url}/video/room/send/viewer/message`,
      method: "POST",
      data,
    });
  }

  sendCommentVoiceByViewer(
    data: FormData
  ): AxiosPromise<BaseResponse<VideoComment>> {
    return this.request({
      url: `${this.url}/video/room/send/viewer/voice`,
      method: "POST",
      data,
      timeout: 0,
    });
  }

  sendCommentAttachmentFileByViewer(
    data: FormData,
    cb: (e: AxiosProgressEvent) => void,
    cancelSignal: AbortSignal
  ): AxiosPromise<BaseResponse<VideoComment>> {
    return this.request({
      url: `${this.url}/video/room/send/viewer/attachment`,
      method: "POST",
      data,
      onUploadProgress: cb,
      timeout: 0,
      signal: cancelSignal,
    });
  }

  getVideoRoomsByOwner(data: {
    videoId: number;
    channelId: number;
  }): AxiosPromise<BaseResponse<GetOwnerVideoRoomsResponse[]>> {
    return this.request({
      url: `${this.url}/video/room/get/owner`,
      method: "POST",
      data,
    });
  }

  getVideoMessagesByOwner(
    data: GetVideoMessagesByOwnerRequestData
  ): AxiosPromise<BaseResponse<VideoComment[]>> {
    return this.request({
      url: `${this.url}/video/room/get/owner/message`,
      method: "POST",
      data,
    });
  }

  sendMessagesByOwner(
    data: SendMessagesByOwnerRequestData
  ): AxiosPromise<BaseResponse<VideoComment>> {
    return this.request({
      url: `${this.url}/video/room/send/owner/message`,
      method: "POST",
      data,
    });
  }

  sendCommentVoiceByOwner(
    data: FormData
  ): AxiosPromise<BaseResponse<VideoComment>> {
    return this.request({
      url: `${this.url}/video/room/send/owner/voice`,
      method: "POST",
      data,
      timeout: 0,
    });
  }

  sendCommentAttachmentFileByOwner(
    data: FormData,
    cb: (e: AxiosProgressEvent) => void,
    cancelSignal: AbortSignal
  ): AxiosPromise<BaseResponse<VideoComment>> {
    return this.request({
      url: `${this.url}/video/room/send/owner/attachment`,
      method: "POST",
      data,
      onUploadProgress: cb,
      timeout: 0,
      signal: cancelSignal,
    });
  }

  chatRoomsByChannel(data: {
    organizationId: number;
  }): AxiosPromise<BaseResponse<ChatRoomsByChannelModel[]>> {
    return this.request({
      url: `${this.url}/app/organization/list/get`,
      method: "POST",
      data,
      timeout: 0,
    });
  }
}

export default function chatApi(request: AxiosInstance) {
  return new ChatApi({
    url: "/chat",
    request,
  });
}
