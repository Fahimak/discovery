"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import React, { useEffect, useState } from "react";
import LineBreak from "components/LineBreak/LineBreak";
import { CircularProgress, TextField } from "@mui/material";
import EventsDateTimePicker from "./components/EventsDateTimePicker";
import BackButton from "components/BackButton/BackButton";
import ImageDropzone from "components/ImageDropzone";
import FileDrop from "components/FileDrop";
import ReactPlayer from "react-player";
import ConfirmationModal from "components/Confirmation";
import { useEventsContext } from "context/Hive/events";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useRouter } from "next/navigation";
import useEventsApi from "hooks/apiHooks/Events/useEventsApi";

const EditEvent = () => {
  const events = useEventsContext();
  const currentEvent = events.currentEvent;

  const [eventDetails, setEventDetails] = useState({
    name: currentEvent?.eventName || "",
    description: currentEvent?.eventDescription || "",
    medium: currentEvent?.eventMedium || "",
    location: currentEvent?.eventLocation || "",
    address: currentEvent?.eventAddress || "",
    link: currentEvent?.eventLink || "",
    banner: currentEvent?.eventBanner || "",
    thumbnail: currentEvent?.eventThumbnail || "",
  });

  const handleDetailsChange = (e: any) => {
    setEventDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMedium = (medium: string) => {
    setEventDetails((prevState) => ({ ...prevState, medium: medium }));
  };

  const fromDate = events.fromDate;
  const toDate = events.toDate;

  useEffect(() => {
    setEventDetails({
      name: currentEvent?.eventName || "",
      description: currentEvent?.eventDescription || "",
      medium: currentEvent?.eventMedium || "",
      location: currentEvent?.eventLocation || "",
      address: currentEvent?.eventAddress || "",
      link: currentEvent?.eventLink || "",
      banner: currentEvent?.eventBanner || "",
      thumbnail: currentEvent?.eventThumbnail || "",
    });
    events.setFromDate(currentEvent?.eventStartDate);
    events.setToDate(currentEvent?.eventEndDate);
  }, [currentEvent]);

  const hive = useHiveContext();

  const hiveUuid = hive.hiveUuid;

  const isLoading = events.isLoading;

  const hiveSettings = useHiveSettingsContext();

  const bannerUrl = hiveSettings.bannerUrl;
  const fileUrl = hiveSettings.webUrl;

  const { uploadEventVideo, updateEvent, deleteEvent } = useEventsApi();

  const handleEdit = () => {
    updateEvent(
      eventDetails.location,
      eventDetails.name,
      eventDetails.description,
      eventDetails.address,
      eventDetails.medium
    );
  };

  const videoUpload = useVideoUploadContext();

  const uploadedFile = videoUpload.videoFile;

  const isUploading = videoUpload.isLoading;

  const [changeIntro, setChangeIntro] = useState(false);

  useEffect(() => {
    setChangeIntro(false);
  }, [currentEvent?.eventVideo]);

  const handleChangeIntro = () => {
    setChangeIntro((prevState) => !prevState);
    videoUpload.setVideoFile(null);
  };

  useEffect(() => {
    hiveSettings.setBannerUrlChanged(false);
    hiveSettings.setUrlChanged(false);
    hiveSettings.setBannerUploaded(false);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  console.log(currentEvent);

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const navigate = useRouter();

  const handleConfirmDelete = () => {
    deleteEvent();

    events.setCurrentEvent(undefined);
    navigate.push("/events");
  };

  return (
    <IslandLayout>
      <div className="create_event_container">
        <BackButton to={`/events/${currentEvent?.eventIdentifier}`} />
        <LineBreak />
        <div className="title_and_limit">
          <h2>Edit Event</h2>
          <div onClick={handleDelete} className="primaryBtn">
            Delete Event
          </div>
        </div>
        <div className="event_details_wrapper">
          <div className="title_and_limit">
            <h3>Event Banner</h3>
          </div>
          <ImageDropzone bannerUrl={eventDetails?.banner} file="banner" />
          <LineBreak />

          <div>
            <h4>Event Name*</h4>
            <LineBreak />
            <TextField
              className="half_width"
              id="standard-basic"
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleDetailsChange}
              value={eventDetails.name}
            />
          </div>
          <div>
            <EventsDateTimePicker />
          </div>
          <div className="title_and_limit">
            <h3>Event Thumbnail</h3>
          </div>
          <ImageDropzone urlSent={eventDetails?.thumbnail} file="channel" />
          <LineBreak />
          <div>
            <h4>Location*</h4>
            <LineBreak />
            <div className="video_limit_btns medium_btns">
              <button
                onClick={() => handleMedium("online")}
                className={`${
                  eventDetails.medium === "online"
                    ? "primaryBtn"
                    : "secondaryBtn"
                }`}
              >
                Online
              </button>
              <button
                onClick={() => handleMedium("offline")}
                className={`${
                  eventDetails.medium === "offline"
                    ? "primaryBtn"
                    : "secondaryBtn"
                }`}
              >
                In-Person
              </button>
            </div>
            <LineBreak />
            <TextField
              className="half_width"
              id="standard-basic"
              label="Location"
              placeholder={
                eventDetails.medium === "offline"
                  ? "Add Event Address or Google Maps Link"
                  : "Add Online Meet Link"
              }
              variant="outlined"
              multiline
              maxRows={4}
              name="location"
              onChange={handleDetailsChange}
              value={eventDetails.location}
            />
          </div>

          <div>
            <h4>Description/Instructions</h4>
            <LineBreak />
            <TextField
              className="half_width"
              id="standard-basic"
              label="Description"
              variant="outlined"
              multiline
              maxRows={4}
              name="description"
              onChange={handleDetailsChange}
              value={eventDetails.description}
            />
          </div>
          <>
            <div className="intro_video_edit_header">
              <h3>Event Video</h3>

              <p onClick={handleChangeIntro} className="link text-sm">
                {`${changeIntro ? "Cancel" : "Change Video"}`}
              </p>
            </div>

            {!!!currentEvent?.eventVideo ? (
              <>
                {uploadedFile ? (
                  <div className="intro_video_edit_wrapper">
                    <ReactPlayer
                      width="270px"
                      height="480px"
                      url={URL.createObjectURL(uploadedFile)}
                      controls
                      style={{
                        overflow: "hidden",
                        background: "black",
                      }}
                    />
                  </div>
                ) : (
                  <FileDrop uploadWhenFinished={uploadEventVideo} />
                )}
              </>
            ) : (
              <>
                {changeIntro ? (
                  <>
                    {uploadedFile ? (
                      <div className="intro_video_edit_wrapper">
                        <ReactPlayer
                          width="270px"
                          height="480px"
                          url={URL.createObjectURL(uploadedFile)}
                          controls
                          style={{
                            overflow: "hidden",
                            background: "black",
                          }}
                        />
                      </div>
                    ) : (
                      <FileDrop uploadWhenFinished={uploadEventVideo} />
                    )}
                  </>
                ) : (
                  <div className="intro_video_edit_wrapper">
                    <ReactPlayer
                      width="270px"
                      height="480px"
                      url={currentEvent?.eventVideo}
                      controls
                      style={{
                        overflow: "hidden",
                        background: "black",
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </>
        </div>
        {!!eventDetails.name &&
        !!eventDetails.location &&
        !!eventDetails.medium &&
        !!fromDate &&
        !!toDate ? (
          <>
            {isLoading ? (
              <div className="primaryBtn nextBtn_event">
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : (
              <div onClick={handleEdit} className="primaryBtn nextBtn_event">
                Save
              </div>
            )}
          </>
        ) : (
          <div className="disabledBtn nextBtn_event">Save</div>
        )}
      </div>
      {isOpen && (
        <ConfirmationModal
          isOpen={isOpen}
          onReject={handleClose}
          onConfirm={handleConfirmDelete}
          headline={`Delete ${currentEvent?.eventName}`}
          description={`Are you sure you want to delete ${currentEvent?.eventName} event?`}
          confirmMessage="Yes"
          rejectMessage="No"
        />
      )}
    </IslandLayout>
  );
};

export default EditEvent;
