import api from "api";
import {
  HiveActivitiesItem,
  OnlineMembersModel,
} from "api/models/Hive/hiveActivities";
import {
  ChannelListModel,
  HiveChannelsModel,
} from "api/models/Hive/hiveChannels";
import {
  ChildComponent,
  Components,
  HiveComponents,
} from "api/models/Hive/hiveComponents";
import {
  ContactInfoModel,
  HiveDetails,
  SocialLinksItem,
  SocialLinksModel,
} from "api/models/Hive/hiveDetails";
import { BaseResponse } from "api/models/base";

export async function getHiveDetailsApi(
  body: any
): Promise<BaseResponse<HiveDetails>> {
  try {
    const { data } = await api.hive.getHiveDetails(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getHiveComponentsApi(
  body: any
): Promise<BaseResponse<Components[]>> {
  try {
    const { data } = await api.hive.getHiveComponents(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getChildComponentsApi(
  body: any
): Promise<BaseResponse<ChildComponent[]>> {
  try {
    const { data } = await api.hive.getChildComponents(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getHiveChannelsApi(body: {
  hiveId: number;
  isMemberView: boolean;
}): Promise<BaseResponse<ChannelListModel[]>> {
  try {
    const { data } = await api.hive.getHiveChannels(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getSocialLinksApi(body: {
  organizationUuid: string;
}): Promise<BaseResponse<SocialLinksItem[]>> {
  try {
    const { data } = await api.hive.getSocialLinks(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getContactInfoApi(body: {
  organizationUuid: string;
}): Promise<BaseResponse<ContactInfoModel>> {
  try {
    const { data } = await api.hive.getContactInfo(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getOnlineMembersApi(body: {
  organizationUuid: string;
}): Promise<BaseResponse<OnlineMembersModel[]>> {
  try {
    const { data } = await api.hive.getOnlineMembers(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}

export async function getHiveActivitiesApi(body: {
  communityId: number;
  pageNo: number;
  contentLimit: number;
  channelUuid?: string;
}): Promise<BaseResponse<HiveActivitiesItem>> {
  try {
    const { data } = await api.hive.getHiveActivities(body);
    return data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}
