import api from "api";
import {
  MainLoginRequest,
  ProfileItem,
  ProfileModel,
} from "api/models/Profile/profile";
import { BaseResponse } from "api/models/base";

export async function getProfileApi(): Promise<BaseResponse<ProfileItem>> {
  try {
    const response = await api.profile.getProfile();
    return response.data;
  } catch (error) {
    // ToastError("Error during email login");
    throw error;
  }
}
