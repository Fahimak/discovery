"use client";
import { useEffect, useState } from "react";
import PageLayout from "components/PageLayout";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import IslandLayout from "components/IslandLayout";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useChannelContext } from "context/Channel/channel";
import { useHiveContext } from "context/Hive/hive";
import { useChatRoomsContext } from "context/Chat/chatroom";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import ChatRoomsListSections from "./components/ChatRoomsListSections";
import useChatApi from "hooks/apiHooks/Chat/useChatApi";

export interface Chatroom {
  id: UniqueId;
  title: string;
  description: string;
  logo: Logo;
  isPinned: boolean;
  onlineCount: number;
}

const ChatRoomsPage = () => {
  const navigate = useRouter();

  const channel = useChannelContext();

  const hive = useHiveContext();

  const hiveDetails = hive.hiveDetails;

  const chatRooms = useChatRoomsContext();

  const chatRoomsByChannels = chatRooms.chatRoomsByChannels;

  const { launchLogin } = useHiveApi();

  // useEffect(() => {
  //   localStorage.getItem("isLoggedIn") !== "yes" && launchLogin();
  // }, []);

  const [redirected, setRedirected] = useState(false);

  const { getChatRoomsByChannelApi } = useChatApi();

  useEffect(() => {
    hiveDetails &&
      getChatRoomsByChannelApi({ organizationId: hiveDetails?.communityId });
  }, [hiveDetails]);

  // useEffect(() => {
  //   hiveDetails &&
  //     channelId &&
  //     dispatch(
  //       checkOwnership({
  //         organizationId: hiveDetails?.communityId,
  //         channelId: channelId,
  //       })
  //     );
  // }, [hiveDetails, channelId]);

  return (
    <IslandLayout>
      {/* <PageLayout sideMenu={false}> */}
      {/* <PageLayout className="chatrooms_page"> */}
      <div className="chatrooms_page_container">
        {/* <div className="fixed_back_button"> */}
        <BackButton to="/home" />
        {/* </div> */}
        <h1>Chat</h1>
        <Divider />
        {/* {!!pinned.length && (
          <ChatRoomsListSections title="Pinned" dataList={pinned} />
        )}
        {!!unpinned.length && (
          <ChatRoomsListSections title="Rooms" dataList={unpinned} />
        )} */}
        {chatRoomsByChannels.map((channel, idx) => {
          return (
            <div className="chat_rooms_by_channels" key={idx}>
              {channel.chatRoomList && channel.chatRoomList.length > 0 && (
                <div>
                  <h3>{channel.channelName}</h3>
                  <ChatRoomsListSections dataList={channel.chatRoomList} />
                </div>
              )}
            </div>
          );
        })}
        <PageLoader />
      </div>
      {/* </PageLayout> */}
      {/* {isModerator && <FlatActionButton />} */}
    </IslandLayout>
  );
};

const PageLoader = () => {
  const chatRooms = useChatRoomsContext();

  const isFetching = chatRooms.isFetchingChatrooms;
  return isFetching ? <CircularProgress /> : null;
};

export default ChatRoomsPage;
