"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";
import { HiveComponentsContextProvider } from "./hiveComponents";
import { HiveDetails } from "api/models/Hive/hiveDetails";
import { ChannelListModel } from "api/models/Hive/hiveChannels";
import { HiveConfigContextProvider } from "./hiveConfig";
import { HiveSettingsContextProvider } from "./hiveSettings";
import { MembersModel } from "api/models/Hive/hiveMembers";
import { NotificationsContextProvider } from "./notifications";
import { EventsContextProvider } from "./events";

export interface HiveContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  hiveDetails: HiveDetails | undefined;
  setHiveDetails: Dispatch<SetStateAction<HiveDetails | undefined>>;
  hiveUuid: string;
  setHiveUuid: Dispatch<SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: Dispatch<SetStateAction<boolean>>;
  showChatbot: boolean;
  setShowChatBot: Dispatch<SetStateAction<boolean>>;
  showSuggested: boolean;
  setShowSuggested: Dispatch<SetStateAction<boolean>>;
  doesExist: boolean;
  setDoesExist: Dispatch<SetStateAction<boolean>>;
  channelList: ChannelListModel[];
  setChannelList: Dispatch<SetStateAction<ChannelListModel[]>>;
  hiveMembers: MembersModel | undefined;
  setHiveMembers: any;
}

const HiveContext = createContext<HiveContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  hiveDetails: undefined,
  setHiveDetails: (): HiveDetails | undefined => undefined,
  hiveUuid: "",
  setHiveUuid: (): string => "",
  isPrivate: false,
  setIsPrivate: (): boolean => false,
  showChatbot: false,
  setShowChatBot: (): boolean => false,
  showSuggested: false,
  setShowSuggested: (): boolean => false,
  doesExist: false,
  setDoesExist: (): boolean => false,
  channelList: [],
  setChannelList: (): ChannelListModel[] => [],
  hiveMembers: undefined,
  setHiveMembers: (): MembersModel | undefined => undefined,
});

export const HiveContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [showChatbot, setShowChatBot] = useState<boolean>(false);
  const [showSuggested, setShowSuggested] = useState<boolean>(false);
  const [doesExist, setDoesExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hiveUuid, setHiveUuid] = useState<string>("");

  const [hiveDetails, setHiveDetails] = useState<HiveDetails | undefined>(
    undefined
  );

  const [channelList, setChannelList] = useState<ChannelListModel[]>([]);
  const [hiveMembers, setHiveMembers] = useState<MembersModel | undefined>(
    undefined
  );

  return (
    <HiveContext.Provider
      value={{
        isLoading,
        setIsLoading,
        hiveDetails,
        setHiveDetails,
        isPrivate,
        setIsPrivate,
        hiveUuid,
        setHiveUuid,
        showChatbot,
        setShowChatBot,
        showSuggested,
        setShowSuggested,
        doesExist,
        setDoesExist,
        channelList,
        setChannelList,
        hiveMembers,
        setHiveMembers,
      }}
    >
      <HiveComponentsContextProvider>
        <HiveConfigContextProvider>
          <HiveSettingsContextProvider>
            <NotificationsContextProvider>
              <EventsContextProvider>{children}</EventsContextProvider>
            </NotificationsContextProvider>
          </HiveSettingsContextProvider>
        </HiveConfigContextProvider>
      </HiveComponentsContextProvider>
    </HiveContext.Provider>
  );
};

export const useHiveContext = () => useContext(HiveContext);
