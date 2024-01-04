import React from "react";

import Text from "components/common/Text";

import { Chatroom } from "../ChatRoomsPage";
import ChatRoomItem from "./ChatRoomsItem";
import { ChatRoomItemModel } from "api/models/Chat/chat";

interface Props {
  // title: string;
  dataList: ChatRoomItemModel[];
  roomId?: string;
}

const ChatroomsListSections: React.FC<Props> = ({ dataList }) => {
  return (
    <div className="chatrooms_section">
      {/* <span className="chatrooms_subtitle_container">
        <Text className="chatrooms_subtitle">{title}</Text>
      </span> */}
      {dataList.map((item, idx) => {
        return <ChatRoomItem key={idx} chatRoomItem={item} />;
      })}
    </div>
  );
};

export default ChatroomsListSections;
