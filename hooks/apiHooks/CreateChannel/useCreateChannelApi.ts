"use client";
import api from "api";
import { getChannelDetailsApi } from "api/actions/Channel/channel";
import { useChannelContext } from "context/Channel/channel";
import { useCreateChannelContext } from "context/Channel/createChannel";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useRouter } from "next/navigation";
import useHiveApi from "../Hive/useHiveApi";

export const useCreateChannelApi = () => {
  const channel = useChannelContext();
  const createChannel = useCreateChannelContext();
  const hive = useHiveContext();
  const hiveSettings = useHiveSettingsContext();

  const router = useRouter();

  const { getChannelList } = useHiveApi();

  const createChannelApi = async (passedName: string, passedDesc: string) => {
    createChannel.setIsLoading(true);
    try {
      const data = await api.hive.createChannel({
        channelName: passedName,
        category: "",
        channelTier:
          createChannel.isPrivate && +createChannel.amount > 0
            ? "PRIVATE_PAID"
            : +createChannel.amount > 0
            ? "PAID"
            : createChannel.isPrivate
            ? "INVITE"
            : "FREE",
        uploadFlag: false,
        amount: +createChannel.amount,
        paymentType: "FREE",
        organizationId: hive.hiveDetails?.communityId!,
        description: passedDesc,
        channelType: "VIDEO",
        channelLogo: hiveSettings.mobileUrl,
        channelWebLogo: hiveSettings.webUrl,
        channelBanner: "",
        duration: createChannel.videoDuration,
        advFrequency: 5,
        advertisement: createChannel.isAds,
        orderByDesc: true,
        channelTabs: [
          {
            tabType: "attribute1",
            tabName: "",
            activeFlag: false,
          },
          {
            tabType: "attribute2",
            tabName: "",
            activeFlag: false,
          },
          {
            tabType: "attribute3",
            tabName: "Description",
            activeFlag: true,
          },
          {
            tabType: "attribute4",
            tabName: "",
            activeFlag: false,
          },
          {
            tabType: "attribute5",
            tabName: "",
            activeFlag: false,
          },
        ],
      });

      if (data.data.responseInfo.httpCode === 200) {
        getChannelList();
        router.push("/home");
      } else {
        router.push("/home");
      }
    } catch {}
    createChannel.setIsLoading(false);
  };

  return { createChannelApi };
};

export default useCreateChannelApi;
