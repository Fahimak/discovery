import BaseApi from "api/base";
import { BASE_AUTH } from "api/config";
import { CreateChannelRequest } from "api/models/Hive/createChannel";
import {
  HiveActivitiesItem,
  HiveActivitiesModel,
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
  HiveDetailsModel,
  PublicHivesModel,
  SocialLinksItem,
  SocialLinksModel,
} from "api/models/Hive/hiveDetails";
import { ContextRequest, EditHiveRequest } from "api/models/Hive/hiveEdit";
import { MembersModel } from "api/models/Hive/hiveMembers";
import {
  PresignedData,
  ResourcePreSignedModel,
} from "api/models/Hive/introVideo";
import { AxiosInstance, AxiosPromise } from "axios";
import { BaseResponse } from "../../models/base";

export class HivePageApi extends BaseApi {
  getHiveComponents(data: any): AxiosPromise<BaseResponse<Components[]>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "component" : "noAuth"
      }/main/list`,
      method: "POST",
      data,
    });
  }

  getChildComponents(data: any): AxiosPromise<BaseResponse<ChildComponent[]>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "component" : "noAuth"
      }/child/list`,
      method: "POST",
      data,
    });
  }

  getHiveChannels(data: {
    hiveId: number;
    isMemberView: boolean;
  }): AxiosPromise<BaseResponse<ChannelListModel[]>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "noAuth/"
      }channel/list`,
      method: "POST",
      data,
    });
  }

  getHiveDetails(data: any): AxiosPromise<BaseResponse<HiveDetails>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "hive/" : "noAuth/"
      }details`,
      method: "POST",
      data,
    });
  }

  getHiveActivities(data: {
    communityId: number;
    pageNo: number;
    contentLimit: number;
    channelUuid?: string;
  }): AxiosPromise<BaseResponse<HiveActivitiesItem>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "noAuth/"
      }activities/get/all/hive`,
      method: "POST",
      data,
    });
  }

  getOnlineMembers(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<OnlineMembersModel[]>> {
    return this.request({
      url: `spring/analytics/cta/${
        localStorage.getItem("isLoggedIn") === "yes" ? "dashboard" : "unAuth"
      }/active/sessions`,

      method: "POST",
      data,
    });
  }

  getSocialLinks(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<SocialLinksItem[]>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "noAuth/"
      }hive/social/handles`,
      method: "POST",
      data,
    });
  }

  getContactInfo(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<ContactInfoModel>> {
    return this.request({
      url: `${this.url}/hive/contact/details`,
      method: "POST",
      data,
    });
  }

  saveSocialLinks(data: {
    organizationUuid: string;
    componentCode: string;
    handleUrl: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/hive/save/social/handles`,
      method: "POST",
      data,
    });
  }

  saveContactInfo(data: {
    organizationUuid: string;
    email: string;
    address: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/hive/save/contact/details`,
      method: "POST",
      data,
    });
  }

  getPublicHives(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<PublicHivesModel>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "noAuth/"
      }hive/suggested/hives`,
      method: "POST",
      data,
    });
  }

  getHiveContext(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<any>> {
    return this.request({
      url: `chat/bot/org/details/get`,
      method: "POST",
      data,
    });
  }

  editHiveContext(data: ContextRequest): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `chat/bot/org/details/update`,
      method: "POST",
      data,
    });
  }

  createChannel(
    data: CreateChannelRequest
  ): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/channel/create/channel`,
      method: "POST",
      data,
    });
  }

  editHiveDetails(data: EditHiveRequest): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/hive/edit`,
      method: "POST",
      data,
    });
  }

  getIntroPresignedUrl(data: {
    type: string;
    communityId: number;
  }): AxiosPromise<BaseResponse<ResourcePreSignedModel>> {
    return this.request({
      url: `/content/admin/resources/pre/signed`,
      method: "POST",
      data,
    });
  }

  getMembersList(data: {
    hiveId: number;
    pageNo: number;
    contentLimit: number;
    userName?: string;
    channelUuid?: string;
  }): AxiosPromise<BaseResponse<MembersModel>> {
    return this.request({
      url: `${this.url}/member/hive/list`,
      method: "POST",
      data,
    });
  }

  removeHiveMember(data: {
    userId: number;
    hiveId: number;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/delete`,
      method: "POST",
      data,
    });
  }

  addSuperAdmin(data: {
    userId: number;
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/add/super/admin`,
      method: "POST",
      data,
    });
  }

  removeChannelMember(data: {
    userId: number;
    channelId: number;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/remove/channel/members`,
      method: "POST",
      data,
    });
  }

  deleteHiveProduct(data: {
    productId: string;
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/chat/bot/org/details/delete/products`,
      method: "POST",
      data,
    });
  }

  addHiveProduct(data: {
    productName: string;
    organizationUuid: string;
    productLink: string | null;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/chat/bot/org/details/add/products`,
      method: "POST",
      data,
    });
  }

  uploadHiveProduct(data: {
    productId: string;
    organizationUuid: string;
    contentType: string;
  }): AxiosPromise<BaseResponse<PresignedData>> {
    return this.request({
      url: `/chat/bot/org/details/upload/products`,
      method: "POST",
      data,
    });
  }

  editHiveProductName(data: {
    productId: string;
    productName: string;
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/chat/bot/org/details/edit/products`,
      method: "POST",
      data,
    });
  }

  emailMemberInvite(data: {
    users: {
      email: string;
    }[];
    channels: string[];
    communityId: number;
    skipEmails: boolean;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/add/email`,
      method: "POST",
      data,
    });
  }
  emailAdminInvite(data: {
    users: {
      email: string;
    }[];
    channels: string[];
    communityId: number;
    skipEmails: boolean;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/add/email/admin`,
      method: "POST",
      data,
    });
  }

  phoneMemberInvite(data: {
    users: {
      mobileNo: string;
    }[];
    channels: string[];
    communityId: number;
    skipEmails: boolean;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/add/phone`,
      method: "POST",
      data,
    });
  }
  phoneAdminInvite(data: {
    users: {
      mobileNo: string;
    }[];
    channels: string[];
    communityId: number;
    skipEmails: boolean;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/member/add/phone/admin`,
      method: "POST",
      data,
    });
  }
}

export default function hivePageApi(request: AxiosInstance) {
  return new HivePageApi({
    request,
    url: `/webApp`,
  });
}
