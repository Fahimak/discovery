"use client";
import { CircularProgress } from "@mui/material";
import FileDrop from "components/FileDrop";
import ImageDropzone from "components/ImageDropzone";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak";
import { useEventsContext } from "context/Hive/events";
import { useHiveContext } from "context/Hive/hive";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import useEventsApi from "hooks/apiHooks/Events/useEventsApi";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const EventMedia = () => {
  const events = useEventsContext();
  const hive = useHiveContext();
  const videoUpload = useVideoUploadContext();
  const hiveSettings = useHiveSettingsContext();

  const currentEvent = events.currentEvent;

  const hiveUuid = hive.hiveUuid;

  const uploadedFile = videoUpload.videoFile;

  const isLoading = events.isLoading;

  const isUploading = videoUpload.isLoading;

  const [changeIntro, setChangeIntro] = useState(false);

  const handleChangeIntro = () => {
    setChangeIntro((prevState) => !prevState);
    videoUpload.setVideoFile(null);
  };

  const navigate = useRouter();

  useEffect(() => {
    if (!!currentEvent) {
      hiveSettings.setBannerUrlChanged(false);
      hiveSettings.setUrlChanged(false);
      hiveSettings.setBannerUploaded(false);
    } else {
      navigate.push("/events");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bannerUrl = hiveSettings.bannerUrl;
  const fileUrl = hiveSettings.webUrl;

  const { editEvent, uploadEventVideo } = useEventsApi();

  const handleFinish = () => {
    editEvent();
    navigate.push("/events");
  };

  const handleSkip = () => {
    navigate.push("/events");
  };

  return (
    <IslandLayout>
      <div className="ce_about_wrapper">
        <h2>{currentEvent?.eventName}</h2>
        <p className="event_location_view_wrapper">
          {currentEvent?.eventMedium === "online" ? "Online" : "In-Person"}{" "}
          {"("}
          {moment.utc(currentEvent?.eventStartDate).local().format("LLL")}
          {" - "}
          {moment.utc(currentEvent?.eventEndDate).local().format("LLL")}
          {")"}
        </p>

        <LineBreak />
        <div className="title_and_limit">
          <h3>Event Banner</h3>
        </div>
        <ImageDropzone file="banner" />
        <LineBreak />
        <div className="title_and_limit">
          <h3>Event Thumbnail</h3>
        </div>
        <ImageDropzone file="channel" />
        <LineBreak />
        <>
          <div className="intro_video_edit_header">
            <h3>Event Video</h3>

            {uploadedFile && (
              <p onClick={handleChangeIntro} className="link text-sm">
                {`${changeIntro ? "Cancel" : "Change Video"}`}
              </p>
            )}
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
        <LineBreak />
        <>
          {isLoading || isUploading ? (
            <div className="nextBtn primaryBtn">
              <CircularProgress size={20} color="inherit" />
            </div>
          ) : (
            <>
              {!!bannerUrl || !!fileUrl || !!uploadedFile ? (
                <div onClick={handleFinish} className="nextBtn primaryBtn">
                  Finish
                </div>
              ) : (
                <div onClick={handleSkip} className="nextBtn primaryBtn">
                  {" "}
                  Skip
                </div>
              )}
            </>
          )}
        </>
      </div>
    </IslandLayout>
  );
};

export default EventMedia;
