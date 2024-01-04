"use client";
import {
  NotificationItem,
  PaginationModel,
} from "api/models/Notifications/Notifications";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface NotificationsContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  pageNo: number;
  setPageNo: any;
  notifications: PaginationModel<NotificationItem> | undefined;
  setNotifications: any;
}

const NotificationsContext = createContext<NotificationsContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  notifications: undefined,
  setNotifications: (): PaginationModel<NotificationItem> | undefined =>
    undefined,
  pageNo: 0,
  setPageNo: (): number => 0,
});

export const NotificationsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [notifications, setNotifications] = useState<
    PaginationModel<NotificationItem> | undefined
  >(undefined);

  return (
    <NotificationsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        pageNo,
        setPageNo,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => useContext(NotificationsContext);
