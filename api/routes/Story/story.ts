import BaseApi from "api/base";
import { AxiosInstance, AxiosPromise } from "axios";

import { BaseResponse } from "../../models/base";
import {
  AddSegmentModel,
  AddSegmentRequest,
  CreateStoryModel,
  EditSegmentRequest,
  EditStoryRequest,
  OrganizationStory,
  OrganizationStoryItem,
  ReactionModel,
  SegmentItem,
  SegmentItemReactRequest,
  StoriesReactionRequest,
  StoriesRequest,
  StoryItemModel,
  StoryLocationModel,
  StoryOrderRequest,
  StorySocialCountItem,
  StoryViewModel,
} from "api/models/Story/story";

export class StoryApi extends BaseApi {
  createStory(data: {
    title: string;
    description: string;
    organizationId: number;
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<CreateStoryModel>> {
    return this.request({
      url: `${this.url}/create`,
      method: "post",
      data,
    });
  }

  getSegments(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<SegmentItem[]>> {
    return this.request({
      url: `${this.url}/before/publishing`,
      method: "post",
      data,
    });
  }

  addSegments(
    data: AddSegmentRequest
  ): AxiosPromise<BaseResponse<CreateStoryModel>> {
    return this.request({
      url: `${this.url}/add/segments`,
      method: "post",
      data,
    });
  }

  removeSegment(data: {
    storyUuid: string;
    id: number;
  }): AxiosPromise<BaseResponse<CreateStoryModel>> {
    return this.request({
      url: `${this.url}/remove/segments`,
      method: "post",
      data,
    });
  }

  publishStory(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<CreateStoryModel>> {
    return this.request({
      url: `${this.url}/publish`,
      method: "post",
      data,
    });
  }

  getStories(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<StoryItemModel[]>> {
    return this.request({
      url: `${this.url}/get/published`,
      method: "post",
      data,
    });
  }

  editSegment(
    data: EditSegmentRequest
  ): AxiosPromise<BaseResponse<AddSegmentModel>> {
    return this.request({
      url: `${this.url}/edit/segments`,
      method: "post",
      data,
    });
  }

  editStory(data: EditStoryRequest): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/edit`,
      method: "post",
      data,
    });
  }

  deleteStory(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/delete`,
      method: "post",
      data,
    });
  }

  getStoryLocation(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<StoryLocationModel[]>> {
    return this.request({
      url: `/spring/analytics/cta/dashboard/story/location/count`,
      method: "post",
      data,
    });
  }

  getStorySocialCount(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<StorySocialCountItem[]>> {
    return this.request({
      url: `/spring/analytics/cta/dashboard/story/origin/count`,
      method: "post",
      data,
    });
  }

  getSegmentReactions(data: {
    storyUuid: string;
    segmentId: number;
  }): AxiosPromise<BaseResponse<ReactionModel[]>> {
    return this.request({
      url: `${this.url}/analytics/story/segment/reactions/count`,
      method: "POST",
      data,
    });
  }

  getSegmentLocation(data: {
    storyUuid: string;
    segmentId: number;
  }): AxiosPromise<BaseResponse<StoryLocationModel[]>> {
    return this.request({
      url: `/spring/analytics/cta/dashboard/story/segment/location/count`,
      method: "post",
      data,
    });
  }

  getStoryDetails(
    data: StoriesRequest
  ): AxiosPromise<BaseResponse<OrganizationStory[]>> {
    return this.request({
      url: `${this.url}/stories`,
      method: "POST",
      data,
    });
  }

  getStoryItem(
    data: StoriesRequest
  ): AxiosPromise<BaseResponse<OrganizationStoryItem>> {
    return this.request({
      url: `webApp/noAuth/story/item`,
      method: "POST",
      data,
    });
  }

  updateStoryReaction(
    data: StoriesReactionRequest
  ): AxiosPromise<BaseResponse> {
    return this.request({
      url: `webApp/story/react`,
      method: "POST",
      data,
    });
  }

  updateStoryOrder(data: StoryOrderRequest): AxiosPromise<BaseResponse> {
    return this.request({
      url: `${this.url}/change/order`,
      method: "POST",
      data,
    });
  }

  getSegmentItemReact(
    data: SegmentItemReactRequest
  ): AxiosPromise<BaseResponse> {
    return this.request({
      url: `webApp/story/get/react`,
      method: "POST",
      data,
    });
  }

  getStoryViews(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<StoryViewModel>> {
    return this.request({
      url: `/spring/analytics/cta/dashboard/story/count`,
      method: "POST",
      data,
    });
  }

  getSegmentViews(data: {
    storyUuid: string;
    segmentId: number;
  }): AxiosPromise<BaseResponse<StoryViewModel>> {
    return this.request({
      url: `/spring/analytics/cta/dashboard/story/segment/count`,
      method: "POST",
      data,
    });
  }

  getStoryReactions(data: {
    storyUuid: string;
  }): AxiosPromise<BaseResponse<ReactionModel[]>> {
    return this.request({
      url: `webApp/analytics/story/reactions/count`,
      method: "POST",
      data,
    });
  }
}

export default function storyApi(request: AxiosInstance) {
  return new StoryApi({
    request,
    url: `/webApp/story`,
  });
}
