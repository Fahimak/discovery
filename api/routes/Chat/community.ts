import { AxiosInstance, AxiosPromise } from "axios";

import BaseApi from "api/base";

import { ChannelUser } from "api/models/Hive/hiveDetails";
import { BaseResponse } from "../../models/base";
import { UsersListOfChatRoomDataRequest } from "api/models/Chat/chat";
export class CommunityApi extends BaseApi {
  getChannelUsersList(
    data: UsersListOfChatRoomDataRequest
  ): AxiosPromise<BaseResponse<ChannelUser[]>> {
    return this.request({
      url: `${this.url}/admin/channel/users`,
      method: "POST",
      data,
    });
  }
}

export default function communityApi(request: AxiosInstance) {
  return new CommunityApi({
    url: "/community",
    request,
  });
}
