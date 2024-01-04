"use client";
import { getFeedApi } from "api/actions/Feed/feed";
import { useFeedContext } from "context/Feed/feed";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import api from "api";
import { EditHiveRequest } from "api/models/Hive/hiveEdit";
import useHiveApi from "./useHiveApi";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useChannelContext } from "context/Channel/channel";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

export const useHiveSettingsApi = () => {
  const hiveSettings = useHiveSettingsContext();
  const hive = useHiveContext();
  const videoUpload = useVideoUploadContext();
  const channels = useChannelContext();

  const { ToastSuccess } = useHiveConfigContext();

  const { getHiveDetails, getContactInfo } = useHiveApi();

  const editHiveDetails = async (passedDetails: EditHiveRequest) => {
    hiveSettings.setIsLoading(true);
    try {
      const { data } = await api.hive.editHiveDetails(passedDetails);

      if (data.responseInfo.httpCode === 200) {
        ToastSuccess("Hive Details Saved");
        videoUpload.setVideoFile(null);
        getHiveDetails();
      } else {
      }
    } catch {}
    hiveSettings.setIsLoading(false);
  };

  const getHiveMembers = async (body: {
    hiveId: number;
    pageNo: number;
    contentLimit: number;
    userName?: string;
    channelUuid?: string;
  }) => {
    try {
      const { data } = await api.hive.getMembersList(body);
      if (data.responseInfo.httpCode === 200) {
        hive.setHiveMembers(data.data);
      }
      return data.data;
    } catch (error) {}
  };

  const removeChannelMember = async (body: {
    userId: number;
    channelId: number;
  }) => {
    try {
      const { data } = await api.hive.removeChannelMember(body);

      getHiveMembers({
        hiveId: hive.hiveDetails?.communityId || 2,
        channelUuid: channels.activeChannelUuid || "",
        pageNo: hiveSettings.pageNo,
        contentLimit: 15,
      });
      return data.data;
    } catch (error) {}
  };

  const removeHiveMember = async (body: { userId: number; hiveId: number }) => {
    try {
      const { data } = await api.hive.removeHiveMember(body);

      getHiveMembers({
        hiveId: body.hiveId,
        pageNo: hiveSettings.pageNo,
        contentLimit: 15,
      });
      return data.data;
    } catch (error) {}
  };

  const addSuperAdmin = async (body: {
    userId: number;
    organizationUuid: string;
  }) => {
    try {
      const { data } = await api.hive.addSuperAdmin(body);

      getHiveMembers({
        hiveId: hive.hiveDetails?.communityId || 0,
        pageNo: hiveSettings.pageNo,
        contentLimit: 15,
      });
      return data.data;
    } catch (error) {}
  };

  //   const getHiveContext = async (passedDetails: EditHiveRequest) => {
  //     hiveSettings.setIsLoading(true);
  //     try {
  //       const { data } = await api.hive.getHiveContext({
  //         organizationUuid: hive.hiveUuid,
  //       });

  //       if (data.responseInfo.httpCode === 200) {
  //         hive.
  //       } else {
  //       }
  //     } catch {}
  //     hiveSettings.setIsLoading(false);
  //   };

  //   const editHiveContext = async (passedDetails: EditHiveRequest) => {
  //     hiveSettings.setIsLoading(true);
  //     try {
  //       const { data } = await api.hive.editHiveDetails(passedDetails);

  //       if (data.responseInfo.httpCode === 200) {
  //         ToastSuccess("Hive Details Saved");
  //         getHiveDetails();
  //       } else {
  //       }
  //     } catch {}
  //     hiveSettings.setIsLoading(false);
  //   };

  const saveContactInfo = async (
    passedEmail: string,
    passedAddress: string
  ) => {
    hiveSettings.setIsLoading(true);
    try {
      const { data } = await api.hive.saveContactInfo({
        organizationUuid: hive.hiveUuid,
        email: passedEmail,
        address: passedAddress,
      });

      if (data.responseInfo.httpCode === 200) {
        getContactInfo();
      } else {
      }
    } catch {}
    hiveSettings.setIsLoading(false);
  };

  return {
    editHiveDetails,
    saveContactInfo,
    getHiveMembers,
    removeChannelMember,
    removeHiveMember,
    addSuperAdmin,
  };
};

export default useHiveSettingsApi;
