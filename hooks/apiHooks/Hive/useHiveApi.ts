"use client";
import api from "api";
import {
  getContactInfoApi,
  getHiveActivitiesApi,
  getHiveChannelsApi,
  getHiveDetailsApi,
  getOnlineMembersApi,
  getSocialLinksApi,
} from "api/actions/Hive/hive";
import { useChannelContext } from "context/Channel/channel";
import { useGlobalContext } from "context/config";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useProfileContext } from "context/Profile/profile";
import { usePathname, useRouter } from "next/navigation";

export const useHiveApi = () => {
  const globalState = useGlobalContext();
  const hiveState = useHiveContext();
  const profileState = useProfileContext();

  const hiveConfigState = useHiveConfigContext();

  const channelContext = useChannelContext();

  const { ToastSuccess, ToastInfo, ToastError } = useHiveConfigContext();

  const router = useRouter();

  const getHiveDetails = async () => {
    globalState.setIsLoading(true);
    try {
      const response = await getHiveDetailsApi({
        // organizationUuid: process.env.REACT_APP_ORG_UUID,

        communitySubDomain: localStorage.getItem("subDomain")!,
      });
      if (response.responseInfo.httpCode === 200) {
        hiveState.setHiveDetails(response.data);
        hiveState.setHiveUuid(response.data.communityUuid);
        hiveState.setIsPrivate(response.data.marketPlace === "PRIVATE");
        hiveState.setShowChatBot(response.data.chatSupportEnabled);
        hiveState.setShowSuggested(response.data.showSuggested);
        localStorage.setItem("subDomain", response.data.communitySubDomain);
        hiveState.setDoesExist(true);
        if (localStorage.getItem("subDomain") === "wise") {
          if (localStorage.getItem("isLoggedIn") !== "yes") {
            launchLogin();
          }
        }
        getChannelList(response.data.communityId);
      } else if (response.responseInfo.httpCode === 302) {
        launchLogin();
        hiveState.setDoesExist(true);
      } else {
        hiveState.setDoesExist(false);
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    globalState.setIsLoading(false);
  };

  const getChannelList = async (passedId?: number) => {
    try {
      const response = await getHiveChannelsApi({
        hiveId: passedId || hiveState.hiveDetails?.communityId || 2,
        isMemberView: profileState.isMemberView,
      });
      if (response.responseInfo.httpCode === 200) {
        hiveState.setChannelList(response.data);
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
  };

  const getSocialLinks = async () => {
    try {
      const response = await getSocialLinksApi({
        organizationUuid: hiveState.hiveUuid,
      });

      if (response.responseInfo.httpCode === 200) {
        hiveConfigState.setSocialLinks(response.data);
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
  };

  const channel = useChannelContext();

  const emailMemberInvite = async (
    data: {
      users: { email: string }[];
      channels: string[];
      communityId: number;
      skipEmails: boolean;
    },
    isChannel: boolean
  ) => {
    channel.setIsLoading(true);

    try {
      const response = await api.hive.emailMemberInvite(data);

      if (response.data.responseInfo.httpCode === 200) {
        ToastSuccess("Invite sent");
        if (isChannel) {
          router.push(`/channels/${data.channels[0]}/about`);
          channel.setActiveTab(1);
          getChannelList();
        }
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    channel.setIsLoading(false);
  };

  const emailAdminInvite = async (
    data: {
      users: { email: string }[];
      channels: string[];
      communityId: number;
      skipEmails: boolean;
    },
    isChannel: boolean
  ) => {
    channel.setIsLoading(true);

    try {
      const response = await api.hive.emailAdminInvite(data);

      if (response.data.responseInfo.httpCode === 200) {
        ToastSuccess("Invite sent");
        if (isChannel) {
          router.push(`/channels/${data.channels[0]}/about`);
          channel.setActiveTab(1);
          getChannelList();
        }
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    channel.setIsLoading(false);
  };

  const phoneUserInvite = async (
    data: {
      users: { mobileNo: string }[];
      channels: string[];
      communityId: number;
      skipEmails: boolean;
    },
    isChannel: boolean
  ) => {
    channel.setIsLoading(true);

    try {
      const response = await api.hive.phoneMemberInvite(data);

      if (response.data.responseInfo.httpCode === 200) {
        ToastSuccess("Invite sent");
        if (isChannel) {
          router.push(`/channels/${data.channels[0]}/about`);
          channel.setActiveTab(1);
          getChannelList();
        }
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    channel.setIsLoading(false);
  };

  const phoneAdminInvite = async (
    data: {
      users: { mobileNo: string }[];
      channels: string[];
      communityId: number;
      skipEmails: boolean;
    },
    isChannel: boolean
  ) => {
    channel.setIsLoading(true);

    try {
      const response = await api.hive.phoneAdminInvite(data);

      if (response.data.responseInfo.httpCode === 200) {
        ToastSuccess("Invite sent");
        if (isChannel) {
          router.push(`/channels/${data.channels[0]}/about`);
          channel.setActiveTab(1);
          getChannelList();
        }
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
    channel.setIsLoading(false);
  };

  const getOnlineMembers = async () => {
    try {
      const response = await getOnlineMembersApi({
        organizationUuid: hiveState.hiveUuid,
      });

      if (response.responseInfo.httpCode === 200) {
        hiveConfigState.setOnlineMembers(response.data);
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
  };

  const getHiveActivities = async (passedLimit: number) => {
    try {
      const response = await getHiveActivitiesApi({
        communityId: hiveState.hiveDetails?.communityId || 0,
        pageNo: hiveConfigState.activitiesPageNo,
        contentLimit: passedLimit,
        channelUuid: channelContext.activeChannelUuid || "",
      });

      if (response.responseInfo.httpCode === 200) {
        hiveConfigState.setActivities(response.data);
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
  };

  const getContactInfo = async () => {
    try {
      const response = await getContactInfoApi({
        organizationUuid: hiveState.hiveUuid,
      });

      if (response.responseInfo.httpCode === 200) {
        hiveConfigState.setContactInfo(response.data);
      } else {
        console.log("Error while getting Channels");
      }

      return response;
    } catch (error) {
      // Handle the error
    }
  };

  const launchLogin = () => {
    const redirect = "https://login.vhive.org";

    window.open(
      redirect + `?domain=discover&path=${localStorage.getItem("path")}`,
      "_self"
    );
  };

  return {
    getHiveDetails,
    launchLogin,
    getChannelList,
    getSocialLinks,
    getContactInfo,
    getOnlineMembers,
    getHiveActivities,
    emailAdminInvite,
    phoneAdminInvite,
    phoneUserInvite,
    emailMemberInvite,
  };
};

export default useHiveApi;
