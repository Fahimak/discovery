import BaseApi from "api/base";
import { AxiosInstance, AxiosPromise } from "axios";

import { BaseResponse } from "../../models/base";
import {
  EventPresignedResponse,
  EventUserItem,
  EventsContentUploadModel,
  EventsEditRequestModel,
  EventsItem,
  EventsListModel,
  EventsModel,
  EventsRequestModel,
} from "api/models/Hive/events";

export class EventsApi extends BaseApi {
  createEvent(
    data: EventsRequestModel
  ): AxiosPromise<BaseResponse<EventsItem>> {
    return this.request({
      url: `${this.url}/create`,
      method: "POST",
      data,
    });
  }

  editEvent(
    data: EventsEditRequestModel
  ): AxiosPromise<BaseResponse<EventsModel>> {
    return this.request({
      url: `${this.url}/edit`,
      method: "POST",
      data,
    });
  }

  uploadEventVideo(
    data: EventsContentUploadModel
  ): AxiosPromise<BaseResponse<EventPresignedResponse>> {
    return this.request({
      url: `${this.url}/video/pre/signed`,
      method: "POST",
      data,
    });
  }

  getEventsList(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<EventsListModel[]>> {
    return this.request({
      url: `${this.url}/get/list`,
      method: "POST",
      data,
    });
  }

  getEventDetails(data: {
    eventIdentifier: string;
  }): AxiosPromise<BaseResponse<EventsModel>> {
    return this.request({
      url: `/webApp${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "/noAuth"
      }/events/get`,
      method: "POST",
      data,
    });
  }

  registerEvent(data: {
    eventUuid: string;
    registerType: number;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/register`,
      method: "POST",
      data,
    });
  }

  deleteEvent(data: {
    eventUuid: string;
  }): AxiosPromise<BaseResponse<boolean>> {
    return this.request({
      url: `${this.url}/delete`,
      method: "POST",
      data,
    });
  }

  getEventOrgOwner(data: {
    organizationUuid: string;
  }): AxiosPromise<BaseResponse<EventUserItem>> {
    return this.request({
      url: `/webApp${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "/noAuth"
      }/events/org/owner`,
      method: "POST",
      data,
    });
  }

  getEventAttendeesList(data: {
    eventIdentifier: string;
  }): AxiosPromise<BaseResponse<EventUserItem[]>> {
    return this.request({
      url: `/webApp${
        localStorage.getItem("isLoggedIn") === "yes" ? "" : "/noAuth"
      }/events/attendees/get/list`,
      method: "POST",
      data,
    });
  }

  getEventPeopleList(data: {
    eventIdentifier: string;
    registerType: number;
  }): AxiosPromise<BaseResponse<EventUserItem[]>> {
    return this.request({
      url: `${this.url}/admin/attendees/get/list`,
      method: "POST",
      data,
    });
  }
}

export default function eventsApi(request: AxiosInstance) {
  return new EventsApi({
    request,
    url: `/webApp/events`,
  });
}
