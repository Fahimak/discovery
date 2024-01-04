"use client";
import api from "api";
import { useEventsContext } from "context/Hive/events";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import useUploadApi from "../Videos/useUploadApi";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

export const useEventsApi = () => {
  const events = useEventsContext();
  const hive = useHiveContext();

  const getEventsList = async () => {
    events.setIsLoading(true);
    try {
      const data = await api.events.getEventsList({
        organizationUuid: hive.hiveUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        events.setEventList(data.data.data);
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const getEventDetails = async (passedId: string) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.getEventDetails({
        eventIdentifier: passedId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        events.setEventResp(data.data.data);
        events.setCurrentEvent(data.data.data.event);
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const getOrgOwner = async (passedId: string) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.getEventOrgOwner({
        organizationUuid: hive.hiveUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
        events.setEventOwner(data.data.data);
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const getAttendeesList = async (passedId: string) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.getEventAttendeesList({
        eventIdentifier: passedId,
      });

      if (data.data.responseInfo.httpCode === 200) {
        events.setEventAttendeesList(data.data.data);
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const getPeoplesList = async (passedType: number) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.getEventPeopleList({
        eventIdentifier: events.currentEvent?.eventIdentifier || "",
        registerType: passedType,
      });

      if (data.data.responseInfo.httpCode === 200) {
        events.setEventAttendeesList(data.data.data);
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const registerEvent = async (passedType: number) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.registerEvent({
        eventUuid: events.currentEvent?.eventUuid || "",
        registerType: passedType,
      });

      if (data.data.responseInfo.httpCode === 200) {
        getEventDetails(events.currentEvent?.eventIdentifier || "");
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const hiveSettings = useHiveSettingsContext();

  const editEvent = async () => {
    events.setIsLoading(true);
    try {
      const data = await api.events.editEvent({
        eventUuid: events.currentEvent?.eventUuid || "",
        organizationUuid: hive.hiveUuid,
        eventBanner: hiveSettings.bannerUrl,
        eventThumbnail: hiveSettings.webUrl,
      });

      if (data.data.responseInfo.httpCode === 200) {
        // getEventDetails(events.currentEvent?.eventIdentifier || "");
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const updateEvent = async (
    passedLocation: string,
    passedName: string,
    passedDesc: string,
    passedAddress: string,
    passedMedium: string
  ) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.editEvent({
        eventUuid: events.currentEvent?.eventUuid || "",
        organizationUuid: hive.hiveUuid,
        eventBanner: hiveSettings.bannerUrl,
        eventThumbnail: hiveSettings.webUrl,
        eventLocation: passedLocation,
        eventName: passedName,
        eventDescription: passedDesc,
        eventVideo: "",
        eventColor: "",
        eventStartDate: events.fromDate,
        eventEndDate: events.toDate,
        eventAddress: passedAddress,
        eventDurationInMinutes: 60,
        eventMedium: passedMedium,
      });

      if (data.data.responseInfo.httpCode === 200) {
        // getEventDetails(events.currentEvent?.eventIdentifier || "");
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const deleteEvent = async () => {
    events.setIsLoading(true);
    try {
      const data = await api.events.deleteEvent({
        eventUuid: events.currentEvent?.eventUuid || "",
      });

      if (data.data.responseInfo.httpCode === 200) {
        getEventsList();
        // getEventDetails(events.currentEvent?.eventIdentifier || "");
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const { populateFormData } = useUploadApi();

  const videoUpload = useVideoUploadContext();

  const uploadEventVideo = async (passedFile: File) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.uploadEventVideo({
        eventUuid: events.currentEvent?.eventUuid || "",
        organizationUuid: hive.hiveUuid,
        contentType: "video/mp4",
      });

      if (data.data.responseInfo.httpCode === 200) {
        const formData = new FormData();
        populateFormData(formData, data.data.data.body.data, passedFile);
        uploadToS3(formData, data.data.data.body.data.url);

        // getEventDetails(events.currentEvent?.eventIdentifier || "");
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  const { ToastError, ToastSuccess } = useHiveConfigContext();

  const uploadToS3 = async (passedFormData: FormData, passedUrl: string) => {
    videoUpload.setIsLoading(true);
    try {
      const response = await api.videos.uploadToS3(passedFormData, passedUrl);
      const { status } = response; // Extract the response status code

      if (status === 204) {
        // Success response
        videoUpload.setIsLoading(false);

        return response.data; // Return the response data if needed
      } else {
        // Handle other response codes
        // You can customize this logic based on your requirements
      }
    } catch (error: any) {
      if (error?.response?.status && error?.response?.status > 205) {
        ToastError("Video upload failed");
        getEventDetails(events.currentEvent?.eventIdentifier || "");
      } else {
        getEventDetails(events.currentEvent?.eventIdentifier || "");

        videoUpload.setIsLoading(false);
        videoUpload.setThumbnail("");
        videoUpload.setVideoFile(null);
      }
    }
    videoUpload.setIsLoading(false);
  };

  const createEvent = async (
    passedLocation: string,
    passedName: string,
    passedDesc: string,
    passedAddress: string,
    passedMedium: string
  ) => {
    events.setIsLoading(true);
    try {
      const data = await api.events.createEvent({
        eventLocation: passedLocation,
        eventName: passedName,
        eventDescription: passedDesc,
        eventVideo: "",
        eventThumbnail: "",
        eventBanner: "",
        eventColor: "",
        eventStartDate: events.fromDate,
        eventEndDate: events.toDate,
        eventAddress: passedAddress,
        organizationUuid: hive.hiveUuid,
        eventDurationInMinutes: 60,
        eventMedium: passedMedium,
      });

      if (data.data.responseInfo.httpCode === 200) {
        events.setCurrentEvent(data.data.data);
      } else {
      }
    } catch {}
    events.setIsLoading(false);
  };

  return {
    getEventsList,
    getOrgOwner,
    getAttendeesList,
    registerEvent,
    getEventDetails,
    createEvent,
    editEvent,
    uploadEventVideo,
    updateEvent,
    deleteEvent,
    getPeoplesList,
  };
};

export default useEventsApi;
