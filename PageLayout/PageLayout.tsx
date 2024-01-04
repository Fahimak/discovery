import HiveConfig from "components/HiveConfig";
import MainMenu from "components/MainMenu";

interface Props {
  sideMenu: boolean;
}

const PageLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  sideMenu,
}) => {
  //   const isOpen = useAppSelector(getBurgerOpenSelector);

  //   const { roomId = "" } = useParams<Params<"roomId">>();

  //   const { chatList } = useChatMessages(roomId);

  //   const chatContainerRef = useRef<HTMLDivElement>(null);

  //   const scrollChatToBottom = () => {
  //     const container = chatContainerRef.current;
  //     if (container) {
  //       container.scrollTop = container.scrollHeight;
  //     }
  //   };

  //   useEffect(() => {
  //     // Scroll to the bottom of the chat container on initial load and when chatList changes
  //     scrollChatToBottom();
  //   }, [chatList]);

  return (
    <div className={`${sideMenu && "page_container"}`}>
      {sideMenu && (
        <div className="main_menu_wrapper">
          <MainMenu />
        </div>
      )}
      {/* {isOpen ? (
        <HamburgerMenu />
      ) : ( */}
      <div className={`${sideMenu && "body_container"}`}>{children}</div>
      {/* )} */}
      {sideMenu && (
        <div className="main_menu_wrapper">
          <HiveConfig />
        </div>
      )}
    </div>
  );
};

export default PageLayout;
