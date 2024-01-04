import BaseApi from "api/base";
import {
  GeoInfo,
  MainLoginRequest,
  ProfileItem,
  ProfileModel,
  ValidateUserTokenRequestBody,
  ValidateUserTokenResponceData,
  VerifyOtpRequest,
} from "api/models/Profile/profile";
import { AxiosInstance, AxiosPromise } from "axios";
import { BaseResponse } from "api/models/base";

export class ProfileApi extends BaseApi {
  mainLogin(data: MainLoginRequest): AxiosPromise<BaseResponse<ProfileItem>> {
    return this.request({
      url: `/user/Auth/web/register/login`,
      method: "POST",
      data,
    });
  }

  googleLogin(data: {
    clientToken: string;
  }): AxiosPromise<BaseResponse<ValidateUserTokenResponceData>> {
    return this.request({
      url: `/user/Auth/Google_login`,
      method: "POST",
      data,
    });
  }

  facebookLogin(data: {
    clientToken: string;
  }): AxiosPromise<BaseResponse<ValidateUserTokenResponceData>> {
    return this.request({
      url: `/user/Auth/Facebook_login`,
      method: "POST",
      data,
    });
  }

  linkedInLogin(data: {
    clientToken: string;
    redirectUri: string;
  }): AxiosPromise<BaseResponse<ValidateUserTokenResponceData>> {
    return this.request({
      url: `/user/Auth/linkedin/login`,
      method: "POST",
      data,
    });
  }

  checkAccess(data: {
    communityDomain: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/community/Profile/check/org/access`,
      method: "POST",
      data,
    });
  }

  verifyOtp(
    data: VerifyOtpRequest
  ): AxiosPromise<BaseResponse<ValidateUserTokenResponceData>> {
    return this.request({
      url: `/user/Auth/signup/verify/login`,
      method: "POST",
      data,
    });
  }

  validateUserUsingToken(
    data: ValidateUserTokenRequestBody
  ): AxiosPromise<BaseResponse<ValidateUserTokenResponceData>> {
    return this.request({
      url: `user/Auth/signup/check`,
      method: "POST",
      data,
    });
  }

  getProfile(): AxiosPromise<BaseResponse<ProfileItem>> {
    return this.request({
      url: `/user/Profile/get/userName`,
      method: "POST",
    });
  }

  refreshToken(): AxiosPromise<BaseResponse<ValidateUserTokenResponceData>> {
    return this.request({
      url: `/user/Auth/Refreshtoken`,
      method: "POST",
    });
  }

  getProfileDetails(data: {
    userId: number;
  }): AxiosPromise<BaseResponse<ProfileModel>> {
    return this.request({
      url: `/user/Profile/details/v2`,
      method: "POST",
      data,
    });
  }

  changeUserInfo(data: {
    userName: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/user/Profile/ChangeUserName`,
      method: "POST",
      data,
    });
  }

  updateUserEmail(data: {
    email: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/update/email`,
      method: "POST",
      data,
    });
  }

  updateUserPhone(data: {
    mobileNo: string;
    countryCode: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/update/phone`,
      method: "POST",
      data,
    });
  }

  getGeoInfo(): AxiosPromise<BaseResponse<GeoInfo>> {
    return this.request({
      url: "https://ipapi.co/json/",
      method: "GET",
    });
  }
}

export default function profileApi(request: AxiosInstance) {
  return new ProfileApi({
    request,
    url: `/`,
  });
}
