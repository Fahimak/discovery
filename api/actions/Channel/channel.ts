import api from "api";
import { ChannelItemModel } from "api/models/Channel/channelDetails";
import { BaseResponse } from "api/models/base";

export async function getChannelDetailsApi(
  data: string
): Promise<BaseResponse<ChannelItemModel>> {
  try {
    const response = await api.channel.getChannelDetails(data);
    return response.data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}
