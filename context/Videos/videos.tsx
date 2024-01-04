"use client";
import { ChannelItemModel } from "api/models/Channel/channelDetails";
import { Components } from "api/models/Hive/hiveComponents";
import { VideoListItem, VideoListModel } from "api/models/Videos/videoList";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";
import { VideoUploadContextProvider } from "./videoUpload";

interface VideoContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  currentVideoIdx: number;
  setCurrentVideoIdx: Dispatch<SetStateAction<number>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  videoList: VideoListModel | undefined;
  setVideoList: Dispatch<SetStateAction<VideoListModel | undefined>>;
  currentVideo: VideoListItem | undefined;
  setCurrentVideo: Dispatch<SetStateAction<VideoListItem | undefined>>;
}

const VideoContext = createContext<VideoContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  pageNo: 0,
  setPageNo: (): number => 0,
  currentVideoIdx: 0,
  setCurrentVideoIdx: (): number => 0,
  activeTab: 0,
  setActiveTab: (): number => 0,
  videoList: undefined,
  setVideoList: (): VideoListModel | undefined => undefined,
  currentVideo: undefined,
  setCurrentVideo: (): VideoListItem | undefined => undefined,
});

export const VideoContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pageNo, setPageNo] = useState<number>(0);
  const [currentVideoIdx, setCurrentVideoIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [videoList, setVideoList] = useState<VideoListModel | undefined>(
    undefined
  );
  const [currentVideo, setCurrentVideo] = useState<VideoListItem | undefined>(
    undefined
  );

  return (
    <VideoContext.Provider
      value={{
        isLoading,
        setIsLoading,
        pageNo,
        setPageNo,
        activeTab,
        setActiveTab,
        videoList,
        setVideoList,
        currentVideo,
        setCurrentVideo,
        currentVideoIdx,
        setCurrentVideoIdx,
      }}
    >
      <VideoUploadContextProvider>{children}</VideoUploadContextProvider>
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
