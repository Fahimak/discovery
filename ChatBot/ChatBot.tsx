import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import { useAppDispatch, useAppSelector } from "hooks/redux";
// import {
//   getChatBotIdSelector,
//   getChatBotIsOpenSelector,
//   setChatBotIsOpen,
// } from "store/reducers/Chat/chat";
import {
  ChatBotHeaderSVG,
  ChatBotSVG,
  CloseChatBotSVG,
} from "components/SVG/SVG";
// import ChatBotRoom from "pages/Chat/ChatRoomPage/ChatBotRoom";
// import { useEffect, useRef } from "react";
// import { getChatBotId } from "store/async-actions/Chat/chat";
// import { getHiveSelector } from "store/reducers/HiveDetails/hiveDetails";
// import { useChatBotMessages } from "pages/Chat/ChatRoomPage/useChatBotMessages";
// import { useChatsBotSocket } from "services/socketBot";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute" as "absolute",
  bottom: "5%",
  right: "2%",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  borderRadius: 3,
  // overflowY: "scroll",
  //   p: 4,
};

export default function ChatBot() {
  // const dispatch = useAppDispatch();

  // const open = useAppSelector(getChatBotIsOpenSelector);

  // const chatBotId = useAppSelector(getChatBotIdSelector);
  // useChatsBotSocket(chatBotId);

  // const hiveDetails = useAppSelector(getHiveSelector);

  // useEffect(() => {
  //   !!!localStorage.getItem("chatSessionId") &&
  //     localStorage.setItem("chatSessionId", uuidv4());
  // }, [uuidv4]);

  // useEffect(() => {
  //   hiveDetails &&
  //     dispatch(
  //       getChatBotId({
  //         organizationId: hiveDetails.communityId,
  //         organizationUuid: hiveDetails.communityUuid,
  //         sessionId: localStorage.getItem("chatSessionId") || "",
  //       })
  //     );
  // }, [hiveDetails]);

  //   const { roomId = "" } = useParams<Params<"roomId">>();

  // const chatContainerRef = useRef<HTMLDivElement>(null);

  // const scrollChatToBottom = () => {
  //   const container = chatContainerRef.current;
  //   if (container) {
  //     container.scrollTop = container.scrollHeight;
  //   }
  // };

  // const { chatList } = useChatBotMessages(chatBotId);

  // useEffect(() => {
  //   // Scroll to the bottom of the chat container on initial load and when chatList changes
  //   setTimeout(() => {
  //     scrollChatToBottom();
  //   }, 300);
  // }, [chatList, open]);

  // const handleOpen = () => {
  //   // localStorage.getItem("isLoggedIn") === "yes"
  //   //   ?
  //   dispatch(setChatBotIsOpen(true));
  //   // : launchLogin();
  // };
  // const handleClose = () => dispatch(setChatBotIsOpen(false));

  return (
    <div className="">
      {!open && <div className="pointer">{/* <ChatBotSVG /> */}</div>}
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
      >
        <div>
          <Fade
            in={open}
            className={`${open ? "slide_in_bot" : "slide_out_bot"}`}
          >
            <Box sx={style}>
              <div className="chat_bot_header">
                <div className="chat_bot_header_left">
                  <ChatBotHeaderSVG />
                  <h4>Customer Service</h4>
                </div>
                <div onClick={handleClose} className="pointer">
                  <CloseChatBotSVG />
                </div>
              </div>
              <div className="scrollableChatBot" ref={chatContainerRef}>
                <ChatBotRoom />
              </div>
            </Box>
          </Fade>
        </div>
      </Modal> */}
    </div>
  );
}
