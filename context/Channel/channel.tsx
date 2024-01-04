"use client";
import { ChannelItemModel } from "api/models/Channel/channelDetails";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";
import { CreateChannelContextProvider } from "./createChannel";

interface ChannelContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  activeChannelUuid: string;
  setActiveChannel: Dispatch<SetStateAction<string>>;
  channelDetails: ChannelItemModel | undefined;
  setChannelDetails: Dispatch<SetStateAction<ChannelItemModel | undefined>>;
  channelTabs: string[];
  setChannelTabs: any;
  activeTab: number;
  setActiveTab: any;
  amount: string;
  setAmount: any;
  isPaid: boolean;
  setIsPaid: any;
  isAds: boolean;
  setIsAds: any;
  isPrivate: boolean;
  setIsPrivate: any;
  videoDuration: number;
  setVideoDuration: any;
  membersPageNo: number;
  setMembersPageNo: any;
  inviteesList: string[];
  setInviteesList: any;
  phoneUsers: {
    mobileNo: string;
    userName?: string;
    userOrigin?: string;
  }[];
  setPhoneUsers: Dispatch<
    SetStateAction<
      {
        mobileNo: string;
        userName?: string;
        userOrigin?: string;
      }[]
    >
  >;
}

const ChannelContext = createContext<ChannelContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  activeChannelUuid: "",
  setActiveChannel: (): string => "",
  channelDetails: undefined,
  setChannelDetails: (): ChannelItemModel | undefined => undefined,
  channelTabs: ["About", "Members", "Settings"],
  setChannelTabs: (): string[] => ["About", "Members", "Settings"],
  activeTab: 0,
  setActiveTab: (): number => 0,
  amount: "",
  setAmount: (): string => "",
  isPaid: false,
  setIsPaid: (): boolean => false,
  isAds: false,
  setIsAds: (): boolean => false,
  isPrivate: false,
  setIsPrivate: (): boolean => false,
  videoDuration: 0,
  setVideoDuration: (): number => 0,
  membersPageNo: 0,
  setMembersPageNo: (): number => 0,
  inviteesList: [],
  setInviteesList: (): string[] => [],
  phoneUsers: [],
  setPhoneUsers: (): {
    mobileNo: string;
    userName?: string;
    userOrigin?: string;
  }[] => [],
});

export const ChannelContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [activeChannelUuid, setActiveChannel] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [channelTabs, setChannelTabs] = useState<string[]>([
    "About",
    "Members",
    "Settings",
  ]);
  const [channelDetails, setChannelDetails] = useState<
    ChannelItemModel | undefined
  >(undefined);
  const [amount, setAmount] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [membersPageNo, setMembersPageNo] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isAds, setIsAds] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [inviteesList, setInviteesList] = useState<string[]>([]);
  const [phoneUsers, setPhoneUsers] = useState<
    {
      mobileNo: string;
      userName?: string;
      userOrigin?: string;
    }[]
  >([]);

  return (
    <ChannelContext.Provider
      value={{
        isLoading,
        setIsLoading,
        activeChannelUuid,
        setActiveChannel,
        channelDetails,
        setChannelDetails,
        channelTabs,
        setChannelTabs,
        activeTab,
        setActiveTab,
        amount,
        setAmount,
        videoDuration,
        setVideoDuration,
        isAds,
        setIsAds,
        isPaid,
        setIsPaid,
        isPrivate,
        setIsPrivate,
        membersPageNo,
        setMembersPageNo,
        inviteesList,
        setInviteesList,
        phoneUsers,
        setPhoneUsers,
      }}
    >
      <CreateChannelContextProvider>{children}</CreateChannelContextProvider>
    </ChannelContext.Provider>
  );
};

export const useChannelContext = () => useContext(ChannelContext);
