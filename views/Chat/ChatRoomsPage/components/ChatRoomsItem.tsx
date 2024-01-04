import React from "react";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";

import { Chatroom } from "../ChatRoomsPage";
import Text from "components/common/Text";
import { ChatRoomItemModel } from "api/models/Chat/chat";
import Link from "next/link";
import { Avatar } from "@mui/material";

interface Props {
  chatRoomItem: ChatRoomItemModel;
  roomId?: string;
}

const ChatRoomItem = ({ chatRoomItem, roomId }: Props) => {
  const removeReadMessages = () => {
    // (updateChatRoomsList(chatRoomItem));
  };

  return (
    <Link
      onClick={removeReadMessages}
      className={`${
        roomId === String(chatRoomItem._id)
          ? "selected_chatroom_item_container"
          : ""
      } chatroom_item_container`}
      href={"/chat/" + String(chatRoomItem._id)}
    >
      <Avatar
        className="chat_room_logo_container"
        src={""}
        alt={`${chatRoomItem.chatRoomName} chatroom logo`}
      >
        {chatRoomItem.chatRoomName.at(0)?.toUpperCase()}
      </Avatar>
      <div className="content_container">
        <Text className="chatroom_item_title" fontWeight="w700">
          {chatRoomItem.chatRoomName}
        </Text>
        <Text className="chatroom_description" fontWeight="w500">
          {chatRoomItem.chatRoomBio}
        </Text>
      </div>
      {chatRoomItem.unreadMessageCount > 0 &&
        (chatRoomItem.unreadMessageCount > 99 ? (
          <div className="unread_wrapper">100+</div>
        ) : (
          <div className="unread_wrapper">
            {chatRoomItem.unreadMessageCount}
          </div>
        ))}
    </Link>
  );
};

export default ChatRoomItem;
