import api from "api";
import { FeedItem, FeedRequestModel } from "api/models/Feed/feed";
import {
  MainLoginRequest,
  ProfileItem,
  ProfileModel,
} from "api/models/Profile/profile";
import { BaseResponse } from "api/models/base";

export async function getFeedApi(
  data: FeedRequestModel
): Promise<BaseResponse<FeedItem[]>> {
  try {
    const response = await api.feed.getFeedVideos(data);
    return response.data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}
