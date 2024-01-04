"use client";
import { ChannelItemModel } from "api/models/Channel/channelDetails";
import { Components } from "api/models/Hive/hiveComponents";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface CreateChannelContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
}

const CreateChannelContext = createContext<CreateChannelContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
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
});

export const CreateChannelContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isAds, setIsAds] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  return (
    <CreateChannelContext.Provider
      value={{
        isLoading,
        setIsLoading,
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
      }}
    >
      {children}
    </CreateChannelContext.Provider>
  );
};

export const useCreateChannelContext = () => useContext(CreateChannelContext);
