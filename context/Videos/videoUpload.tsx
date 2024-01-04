"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

interface VideoUploadContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  stillInEC2: boolean;
  setStillInEC2: Dispatch<SetStateAction<boolean>>;
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<any>>;
  contentType: string;
  setContentType: Dispatch<SetStateAction<string>>;
  isYoutube: number;
  setIsYoutube: Dispatch<SetStateAction<number>>;
  youtubeUrl: string;
  setYoutubeUrl: Dispatch<SetStateAction<string>>;
  videoFile: File | null;
  setVideoFile: Dispatch<SetStateAction<File | null>>;
}

const VideoUploadContext = createContext<VideoUploadContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  stillInEC2: false,
  setStillInEC2: (): boolean => false,
  thumbnail: "",
  setThumbnail: (): string => "",
  contentType: "",
  setContentType: (): string => "",
  isYoutube: 0,
  setIsYoutube: (): number => 0,
  youtubeUrl: "",
  setYoutubeUrl: (): string => "",
  videoFile: null,
  setVideoFile: (): File | null => null,
});

export const VideoUploadContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stillInEC2, setStillInEC2] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [isYoutube, setIsYoutube] = useState<number>(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <VideoUploadContext.Provider
      value={{
        isLoading,
        setIsLoading,
        stillInEC2,
        setStillInEC2,
        thumbnail,
        setThumbnail,
        contentType,
        setContentType,
        isYoutube,
        setIsYoutube,
        youtubeUrl,
        setYoutubeUrl,
        videoFile,
        setVideoFile,
      }}
    >
      {children}
    </VideoUploadContext.Provider>
  );
};

export const useVideoUploadContext = () => useContext(VideoUploadContext);
