"use client";
import api from "api";
import { getChannelDetailsApi } from "api/actions/Channel/channel";
import { useChannelContext } from "context/Channel/channel";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useRouter } from "next/navigation";

export const useChannelApi = () => {
  const channel = useChannelContext();
  const hive = useHiveContext();
  const hiveSettings = useHiveSettingsContext();

  const { ToastSuccess } = useHiveConfigContext();

  const router = useRouter();

  const getChannelDetails = async (passedUuid: string) => {
    channel.setIsLoading(true);
    try {
      const data = await getChannelDetailsApi(passedUuid);

      if (data.data.objChannel !== null) {
        channel.setChannelDetails(data.data);
      } else {
        router.push("/home");
      }
    } catch {}
    channel.setIsLoading(false);
  };

  const editChannelDetailsAbout = async (
    passedName: string,
    passedDesc: string
  ) => {
    channel.setIsLoading(true);
    try {
      const data = await api.channel.editChannelDetails({
        channelName: passedName,
        category: "CHANNEL",
        channelLogo: hiveSettings.mobileUrl,
        channelWebLogo: hiveSettings.webUrl,
        channelTier: "Invite",
        uploadFlag: false,
        amount: 0,
        description: passedDesc,
        maxVideoLength: 0,
        channelId: channel.channelDetails?.objChannel.id || 0,
        channelNameFlag: true,
        categoryFlag: false,
        channelTierFlag: false,
        amountFlag: false,
        descriptionFlag: true,
        maxVideoLengthFlag: false,
        channelLogoFlag: hiveSettings.urlChanged,
        channelWebLogoFlag: hiveSettings.urlChanged,
        orderByDesc: false,
        adsRequired: false,
      });

      if (data.data.responseInfo.httpCode === 200) {
        ToastSuccess("Channel Details Saved");
        getChannelDetails(channel.channelDetails?.objChannel.channelUUID || "");
      } else {
        router.push("/home");
      }
    } catch {}
    channel.setIsLoading(false);
  };

  const removeChannelLogo = async (passedName: string, passedDesc: string) => {
    channel.setIsLoading(true);
    try {
      const data = await api.channel.editChannelDetails({
        channelName: passedName,
        category: "CHANNEL",
        channelLogo: "",
        channelWebLogo: "",
        channelTier: "Invite",
        uploadFlag: false,
        amount: 0,
        description: passedDesc,
        maxVideoLength: 0,
        channelId: channel.channelDetails?.objChannel.id || 0,
        channelNameFlag: false,
        categoryFlag: false,
        channelTierFlag: false,
        amountFlag: false,
        descriptionFlag: false,
        maxVideoLengthFlag: false,
        channelLogoFlag: true,
        channelWebLogoFlag: true,
        orderByDesc: false,
        adsRequired: false,
      });

      if (data.data.responseInfo.httpCode === 200) {
        ToastSuccess("Channel Details Saved");
        getChannelDetails(channel.channelDetails?.objChannel.channelUUID || "");
      } else {
        router.push("/home");
      }
    } catch {}
    channel.setIsLoading(false);
  };

  const editChannelSettingsApi = async () => {
    channel.setIsLoading(true);
    try {
      const data = await api.channel.editChannelDetails({
        channelName: "",
        category: "CHANNEL",
        channelLogo: "",
        channelWebLogo: "",
        channelTier:
          channel.isPrivate && +channel.amount > 0
            ? "PRIVATE_PAID"
            : channel.isPaid && +channel.amount > 0
            ? "PAID"
            : channel.isPrivate
            ? "INVITE"
            : "FREE",
        uploadFlag: false,
        amount: +channel.amount,
        description: "",
        maxVideoLength: channel.videoDuration,
        channelId: channel.channelDetails?.objChannel.id!,
        channelNameFlag: false,
        categoryFlag: false,
        channelTierFlag: true,
        amountFlag: true,
        descriptionFlag: false,
        maxVideoLengthFlag: true,
        channelLogoFlag: false,
        channelWebLogoFlag: false,
        orderByDesc: false,
        adsRequired: channel.isAds,
      });

      if (data.data.responseInfo.httpCode === 200) {
        ToastSuccess("Channel Details Saved");
        getChannelDetails(channel.channelDetails?.objChannel.channelUUID || "");
      } else {
        router.push("/home");
      }
    } catch {}
    channel.setIsLoading(false);
  };

  return {
    getChannelDetails,
    editChannelDetailsAbout,
    removeChannelLogo,
    editChannelSettingsApi,
  };
};

export default useChannelApi;
