import BaseApi from "api/base";
import {
  ContentUploadRequest,
  ReUploadUrlRequest,
  SpotlightItem,
  SpotlightModel,
  SpotlightVidsModel,
  UploadContentModel,
  YoutubeVideoData,
} from "api/models/Videos/uploadContent";
import {
  VideoListItem,
  VideoListModel,
  VideoListRequest,
} from "api/models/Videos/videoList";
import { AxiosInstance, AxiosPromise } from "axios";

import { BaseResponse } from "../../models/base";

export class VideosApi extends BaseApi {
  contentUpload(
    data: ContentUploadRequest
  ): AxiosPromise<BaseResponse<UploadContentModel>> {
    return this.request({
      url: `${this.url}/channel/video/upload`,
      method: "POST",
      data,
    });
  }

  YTContentUpload(data: YoutubeVideoData): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/content/video/upload/link`,
      method: "POST",
      data,
    });
  }

  getPresignedUrl(
    data: ReUploadUrlRequest
  ): AxiosPromise<BaseResponse<UploadContentModel>> {
    return this.request({
      url: `${this.url}/channel/video/reUpload`,
      method: "POST",
      data,
    });
  }

  uploadToS3(data: FormData, s3Url: string): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${s3Url}`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=---BOUNDARY",
      },
      data,
    });
  }

  getVideoList(
    data: VideoListRequest
  ): AxiosPromise<BaseResponse<VideoListModel>> {
    return this.request({
      url: `${this.url}/${
        localStorage.getItem("isLoggedIn") === "yes" ? "channel" : "noAuth"
      }/video/list`,
      method: "POST",
      data,
    });
  }

  updateVideoStatus(data: {
    videoId: string;
    channelUUID: string;
    status: string;
    approvalNotes: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/channel/video/update/status`,
      method: "POST",
      data,
    });
  }

  getVideoDetails(data: {
    videoId: string;
    channelID: string;
  }): AxiosPromise<BaseResponse<VideoListItem>> {
    return this.request({
      url: `/content/${
        localStorage.getItem("isLoggedIn") === "yes" ? "video" : "landing"
      }/details/uuid`,
      method: "POST",
      data,
    });
  }

  readyToUpload(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `/community/admin/check/org/config`,
      method: "POST",
      data,
    });
  }

  getSpotlight(data: {
    communityId: number;
  }): AxiosPromise<BaseResponse<SpotlightItem[]>> {
    return this.request({
      url: `/community/landing/spotlights`,
      method: "POST",
      data,
    });
  }

  getSpotlightVids(data: {
    channelUuid: string;
    page: number;
    noOfRecords: number;
  }): AxiosPromise<BaseResponse<VideoListModel>> {
    return this.request({
      url: `${this.url}/channel/video/own/list`,
      method: "POST",
      data,
    });
  }
}

export default function videosApi(request: AxiosInstance) {
  return new VideosApi({
    request,
    url: `/webApp`,
  });
}
