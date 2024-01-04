"use client";
import { FeedItem } from "api/models/Feed/feed";
import { Components } from "api/models/Hive/hiveComponents";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

export interface FeedContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  feedVidsResp: FeedItem[];
  setFeedVidsResp: Dispatch<SetStateAction<FeedItem[]>>;
  feedVids: FeedItem[];
  setFeedVids: Dispatch<SetStateAction<FeedItem[]>>;
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
}

const FeedContext = createContext<FeedContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  pageNo: 0,
  setPageNo: (): number => 0,
  feedVidsResp: [],
  setFeedVidsResp: (): FeedItem[] => [],
  feedVids: [],
  setFeedVids: (): FeedItem[] => [],
});

export const FeedContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);

  const [feedVidsResp, setFeedVidsResp] = useState<FeedItem[]>([]);
  const [feedVids, setFeedVids] = useState<FeedItem[]>([]);

  return (
    <FeedContext.Provider
      value={{
        isLoading,
        setIsLoading,
        feedVidsResp,
        setFeedVidsResp,
        feedVids,
        setFeedVids,
        pageNo,
        setPageNo,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = () => useContext(FeedContext);
