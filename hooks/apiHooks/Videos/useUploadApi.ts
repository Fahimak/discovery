"use client";
import api from "api";
import { UploadContentItem } from "api/models/Videos/uploadContent";
import { useChannelContext } from "context/Channel/channel";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveContext } from "context/Hive/hive";
import { useProfileContext } from "context/Profile/profile";
import { useVideoContext } from "context/Videos/videos";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useRouter } from "next/navigation";
import useHiveApi from "../Hive/useHiveApi";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

export const useUploadApi = () => {
  const profileState = useProfileContext();

  const router = useRouter();

  const video = useVideoContext();

  const channel = useChannelContext();
  const hive = useHiveContext();
  const videoUpload = useVideoUploadContext();

  const { ToastSuccess, ToastInfo, ToastError } = useHiveConfigContext();

  const readyToUpload = async () => {
    // video.setIsLoading(true);
    try {
      const { data } = await api.videos.readyToUpload({
        organizationUuid: hive.hiveUuid,
      });
      if (!!data.data) {
        videoUpload.setStillInEC2(false);
      } else {
        videoUpload.setStillInEC2(true);
      }
    } catch (error) {
      console.log(error);
      // Handle the error
    }
    // video.setIsLoading(false);
  };

  const uploadVideo = async (
    passedName: string,
    passedAttr3: string[],
    passedTags: string[]
  ) => {
    videoUpload.setIsLoading(true);
    try {
      const { data } = await api.videos.contentUpload({
        organisationID: hive.hiveUuid,
        channelID: channel.activeChannelUuid || "",
        thumbNailBase64: videoUpload.thumbnail,
        previewImage: videoUpload.thumbnail,
        userId: "1234",
        name: passedName,
        channelType: "VIDEO",
        attribute5: [],
        attribute4: [],
        attribute3: passedAttr3,
        attribute2: [],
        attribute1: [],
        receipeName: passedName,
        itemDescription: null,
        tags: passedTags,
      });
      if (data.responseInfo.httpCode === 200) {
        const formData = new FormData();

        populateFormData(formData, data.data.data, videoUpload.videoFile!);
        uploadToS3(formData, data.data.data.url);
      } else {
        ToastError("Video upload failed");
      }
    } catch (error) {
      console.log(error);
      // Handle the error
    }
    videoUpload.setIsLoading(false);
  };

  const YTUploadContent = async (
    passedName: string,
    passedAttr3: string[],
    passedTags: string[]
  ) => {
    videoUpload.setIsLoading(true);
    try {
      const { data } = await api.videos.YTContentUpload({
        channelID: channel.activeChannelUuid || "",
        previewImage: videoUpload.thumbnail,
        channelType: "YOUTUBE",
        attribute3: passedAttr3,
        attribute2: [],
        attribute1: [],
        receipeName: passedName,
        itemDescription: null,
        tags: passedTags,
        productUrl: videoUpload.youtubeUrl,
        thumbnail: videoUpload.thumbnail,
        name: passedName,
        sourceURL: "",
      });

      if (data.responseInfo.httpCode === 200) {
        ToastSuccess("Youtube Video Uploaded Successfully");
        router.push(`/channels/${channel.activeChannelUuid}`);
        videoUpload.setYoutubeUrl("");
        videoUpload.setIsYoutube(0);
        video.setActiveTab(1);
        videoUpload.setIsLoading(false);
        videoUpload.setThumbnail("");
        videoUpload.setVideoFile(null);
      }
    } catch (error) {}
    videoUpload.setIsLoading(false);
  };

  const hiveSettings = useHiveSettingsContext();

  const GetIntroPresignedUrl = async () => {
    videoUpload.setIsLoading(true);
    try {
      const { data } = await api.hive.getIntroPresignedUrl({
        type: "INTROVIDEO",
        communityId: hive.hiveDetails?.communityId || 2,
      });
      const formData = new FormData();
      populateFormData(
        formData,
        data.data.preSigned.data,
        videoUpload.videoFile!
      );

      hiveSettings.setIntroUploadUrl(data.data.sourceUrl);

      uploadIntroToS3(formData, data.data.preSigned.data.url);
    } catch (error) {}
    videoUpload.setIsLoading(false);
  };

  const populateFormData = (
    formData: FormData,
    contentUploadResp: UploadContentItem,
    file: File
  ) => {
    formData.append(
      "x-amz-meta-userid",
      contentUploadResp?.fields["x-amz-meta-userid"]!
    );
    formData.append("Content-Type", contentUploadResp.fields["Content-Type"]);
    formData.append("key", contentUploadResp?.fields.key!);
    formData.append("bucket", contentUploadResp?.fields.bucket!);
    formData.append(
      "X-Amz-Algorithm",
      contentUploadResp?.fields["X-Amz-Algorithm"]!
    );
    formData.append(
      "X-Amz-Credential",
      contentUploadResp?.fields["X-Amz-Credential"]!
    );
    formData.append("X-Amz-Date", contentUploadResp?.fields["X-Amz-Date"]!);
    formData.append(
      "X-Amz-Security-Token",
      contentUploadResp?.fields["X-Amz-Security-Token"]!
    );
    formData.append(
      "X-Amz-Signature",
      contentUploadResp?.fields["X-Amz-Signature"]!
    );
    formData.append("Policy", contentUploadResp?.fields.Policy!);
    formData.append("file", file!);
  };

  const uploadToS3 = async (passedFormData: FormData, passedUrl: string) => {
    videoUpload.setIsLoading(true);
    try {
      const response = await api.videos.uploadToS3(passedFormData, passedUrl);
      const { status } = response; // Extract the response status code

      if (status === 204) {
        // Success response
        router.push(`/channels/${channel.activeChannelUuid}`);
        video.setActiveTab(1);
        videoUpload.setIsLoading(false);
        return response.data; // Return the response data if needed
      } else {
        // Handle other response codes
        // You can customize this logic based on your requirements
      }
    } catch (error: any) {
      if (error?.response?.status && error?.response?.status > 205) {
        ToastError("Video upload failed");
      } else {
        router.push(`/channels/${channel.activeChannelUuid}`);
        video.setActiveTab(1);
        videoUpload.setIsLoading(false);
        ToastSuccess("Video uploaded successfully");
        videoUpload.setThumbnail("");
        videoUpload.setVideoFile(null);
      }
    }
    videoUpload.setIsLoading(false);
  };

  const uploadIntroToS3 = async (
    passedFormData: FormData,
    passedUrl: string
  ) => {
    videoUpload.setIsLoading(true);
    try {
      const response = await api.videos.uploadToS3(passedFormData, passedUrl);
      const { status } = response; // Extract the response status code

      if (status === 204) {
        // Success response
        return response.data; // Return the response data if needed
      } else {
        // Handle other response codes
        // You can customize this logic based on your requirements
      }
    } catch (error: any) {
      if (error?.response?.status && error?.response?.status > 205) {
        ToastError("Video upload failed");
      } else {
        videoUpload.setThumbnail("");
      }
    }
    videoUpload.setIsLoading(false);
  };

  return {
    readyToUpload,
    uploadVideo,
    YTUploadContent,
    GetIntroPresignedUrl,
    populateFormData,
  };
};

export default useUploadApi;
