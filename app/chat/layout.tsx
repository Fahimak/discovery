import { BaseResponse } from "api/models/base";
import React from "react";
import ChatRoomsPage from "views/Chat/ChatRoomsPage/ChatRoomsPage";

export default function Layout({
  // params,
  children,
}: {
  // params: { channelUuid: string };
  children: React.ReactNode;
}) {
  return (
    <div className="chats_body_container">
      <div className="col-span-2">
        <ChatRoomsPage />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
