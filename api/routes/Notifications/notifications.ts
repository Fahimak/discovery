import BaseApi from "api/base";
import { AxiosInstance, AxiosPromise } from "axios";

import { BaseResponse } from "../../models/base";
import {
  FCMTokenReq,
  PaginationModel,
} from "api/models/Notifications/Notifications";

export class NotificationApi extends BaseApi {
  getUserNotification(data: {
    organizationUuid: string;
    page: number;
    limit: number;
  }): AxiosPromise<BaseResponse<PaginationModel<string>>> {
    return this.request({
      url: `/notification/user/get`,
      method: "POST",
      data,
    });
  }

  readUserNotification(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/notification/user/update/read`,
      method: "POST",
      data,
    });
  }

  updateFCMToken(data: FCMTokenReq): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/user/Profile/update/device/info`,
      method: "POST",
      data,
    });
  }
}

export default function notificationApi(request: AxiosInstance) {
  return new NotificationApi({
    request,
    url: `/webApp`,
  });
}
