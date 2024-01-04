import BaseApi from "api/base";
import { BASE_AUTH } from "api/config";
import {
  CartIdListForCheckoutModel,
  CartModel,
  RazorPayModel,
} from "api/models/Channel/cartModel";
import {
  ChannelDetailsModel,
  ChannelItemModel,
} from "api/models/Channel/channelDetails";
import {
  EditChannelRequest,
  EditVideoRequest,
} from "api/models/Channel/editChannel";
import { AxiosInstance, AxiosPromise } from "axios";

import { BaseResponse } from "../../models/base";
import { ChannelListModel } from "api/models/Hive/hiveChannels";

export class ChannelsApi extends BaseApi {
  getChannelDetails(
    data: string
  ): AxiosPromise<BaseResponse<ChannelItemModel>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "channel" : "noAuth"
      }/get/details/uuid/${data}`,
      method: "GET",
      data,
    });
  }

  getAllStatusChannels(data: {
    organizationUuid: string;
    status: string;
  }): AxiosPromise<BaseResponse<ChannelListModel[]>> {
    return this.request({
      url: `${this.url}/channel/list/status`,
      method: "POST",
      data,
    });
  }

  changeChannelStatus(
    data: {
      channelId: number;
      channelStatus: string;
      comments: string;
    },
    passedStatus: string
  ): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/community/admin/channel/${passedStatus}`,
      method: "POST",
      data,
    });
  }

  getChannelInsights(data: {
    channelId: number;
  }): AxiosPromise<BaseResponse<ChannelDetailsModel>> {
    return this.request({
      url: `/community/landing/channel/insights`,
      method: "POST",
      data,
    });
  }

  addToCart(
    data: [
      {
        cartItemName: string;
        cartItemType: string;
        cartItemReferenceId: number;
        quantity: number;
        communityId: number;
      }
    ]
  ): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/payment/add/cart/items`,
      method: "POST",
      data,
    });
  }

  getCartList(data: {
    communityId: number;
  }): AxiosPromise<BaseResponse<CartModel[]>> {
    return this.request({
      url: `${this.url}/payment/list/cart/items`,
      method: "POST",
      data,
    });
  }

  editChannelDetails(
    data: EditChannelRequest
  ): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/channel/update/details`,
      method: "POST",
      data,
    });
  }

  editVideoDetails(
    data: EditVideoRequest
  ): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/channel/video/edit`,
      method: "POST",
      data,
    });
  }

  createRazorPayOrder(data: {
    cartItems: CartIdListForCheckoutModel[];
    userId: number;
    countryCode: string;
  }): AxiosPromise<BaseResponse<RazorPayModel>> {
    return this.request({
      url: `/payment/razorpay/order/create`,
      method: "POST",
      data,
    });
  }

  razorPayVerifyPayment(data: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/payment/razorpay/verify`,
      method: "POST",
      data,
    });
  }

  chargeForPayment(data: {
    customerId: number;
    stripeToken: string;
    cartItems: CartIdListForCheckoutModel[];
    userId: number;
    countryCode: string;
    currency: string | null;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/payment/stripe/charge`,
      method: "POST",
      data,
    });
  }
}

export default function channelsApi(request: AxiosInstance) {
  return new ChannelsApi({
    request,
    url: `/webApp`,
  });
}
