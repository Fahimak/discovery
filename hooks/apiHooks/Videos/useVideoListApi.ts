"use client";
import api from "api";
import { VideoListItem, VideoListRequest } from "api/models/Videos/videoList";
import { useChannelContext } from "context/Channel/channel";
import { useGlobalContext } from "context/config";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useProfileContext } from "context/Profile/profile";
import { useVideoContext } from "context/Videos/videos";
import { useRouter } from "next/navigation";

export const useVideoListApi = () => {
  const globalState = useGlobalContext();
  const profileState = useProfileContext();

  const router = useRouter();

  const { ToastSuccess, ToastError } = useHiveConfigContext();

  const child = useChildComponentsContext();

  const video = useVideoContext();

  const channel = useChannelContext();

  const getVideoList = async (passedValue: number) => {
    video.setIsLoading(true);
    try {
      const { data } = await api.videos.getVideoList({
        channelUuid: channel.activeChannelUuid,
        page: video.pageNo,
        noOfRecords: 12,
        status:
          passedValue === 0
            ? "Ready"
            : child.videoTabs[passedValue].componentName,
      });
      if (data.responseInfo.httpCode === 200) {
        video.setVideoList(data.data);
      } else {
        video.setVideoList(undefined);
      }
    } catch (error) {
      console.log(error);
      // Handle the error
    }
    video.setIsLoading(false);
  };

  const updateVideoStatus = async (
    passedVideo: VideoListItem,
    passedStatus: string
  ) => {
    video.setIsLoading(true);
    try {
      const { data } = await api.videos.updateVideoStatus({
        videoId: passedVideo.videoUuid || "",
        channelUUID: channel.activeChannelUuid,
        status: passedStatus,
        approvalNotes: passedStatus,
      });
      if (data.responseInfo.httpCode === 200) {
        ToastSuccess(
          `Video has been moved to the ${
            passedStatus === "Ready" ? "Videos" : passedStatus.toLowerCase()
          } tab`
        );
        getVideoList(video.activeTab);
      }
      return data.data;
    } catch (error) {
      ToastError("Couldnt change video status");
    }
    video.setIsLoading(false);
  };

  const getVideoDetails = async (
    passedChannelUuid: string,
    passedVideoUuid: string
  ) => {
    video.setIsLoading(true);
    try {
      const { data } = await api.videos.getVideoDetails({
        videoId: passedVideoUuid || "",
        channelID: passedChannelUuid,
      });
      if (data.responseInfo.httpCode === 200) {
        video.currentVideo = data.data;
        video.setCurrentVideo(data.data);
      }
      return data.data;
    } catch (error) {
      ToastError("Couldnt change video status");
    }
    video.setIsLoading(false);
  };

  return {
    getVideoList,
    updateVideoStatus,
    getVideoDetails,
  };
};

export default useVideoListApi;
