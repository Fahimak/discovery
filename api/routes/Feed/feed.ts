import BaseApi from "api/base";
import { FeedItem, FeedModel, FeedRequestModel } from "api/models/Feed/feed";
import { AxiosInstance, AxiosPromise } from "axios";

import { BaseResponse } from "../../models/base";

export class FeedApi extends BaseApi {
  getFeedVideos(
    data: FeedRequestModel
  ): AxiosPromise<BaseResponse<FeedItem[]>> {
    return this.request({
      url: `${this.url}${
        localStorage.getItem("isLoggedIn") === "no" ? "/noAuth" : ""
      }/feed/get/videos`,
      method: "POST",
      data,
    });
  }
}

export default function feedApi(request: AxiosInstance) {
  return new FeedApi({
    request,
    url: `/webApp`,
  });
}
