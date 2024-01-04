import { AxiosInstance, AxiosPromise } from "axios";

import BaseApi from "api/base";
import { BaseResponse } from "../../models/base";
import {
  ChannelContentsDataRequest,
  ChannelContentsDataResponse,
} from "../../models/Content/content";

export class ContentApi extends BaseApi {
  getChannelContents(
    data: ChannelContentsDataRequest
  ): AxiosPromise<BaseResponse<ChannelContentsDataResponse[]>> {
    return this.request({
      url: `${this.url}/video/List`,
      method: "post",
      data,
    });
  }

  checkOwnership(data: {
    organizationId: number;
    channelId: number;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/webApp/component/check/type`,
      method: "post",
      data,
    });
  }
}

export default function contentApi(request: AxiosInstance) {
  return new ContentApi({
    url: "/content",
    request,
  });
}
