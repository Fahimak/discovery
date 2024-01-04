"use client";
import { CircularProgress } from "@mui/material";
import LineBreak from "components/LineBreak";
import ImageDropzone from "components/ImageDropzone";
import ReactPlayer from "react-player";
import FileDrop from "components/FileDrop";
import { useHiveContext } from "context/Hive/hive";
import { useMediaPageContext } from "../useHiveMedia";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import useUploadApi from "hooks/apiHooks/Videos/useUploadApi";
import { useEffect } from "react";

const HiveMedia = () => {
  const hive = useHiveContext();
  const hiveDetails = hive.hiveDetails;
  const videoUpload = useVideoUploadContext();
  const hiveSettings = useHiveSettingsContext();

  const {
    removeHiveBanner,
    removeHiveLogo,
    changeIntro,
    handleSave,
    handleChangeIntro,
  } = useMediaPageContext();

  const { GetIntroPresignedUrl } = useUploadApi();

  useEffect(() => {
    if (videoUpload.videoFile) {
      hiveDetails && GetIntroPresignedUrl();
    }
  }, [videoUpload.videoFile]);

  return (
    <div className="">
      <div className="about_container">
        <LineBreak />
        <div className="title_and_limit">
          <h3>Hive Banner</h3>
          <p onClick={removeHiveBanner} className="link text-sm">
            Remove Image
          </p>
        </div>
        {hiveDetails && (
          <ImageDropzone
            bannerUrl={hiveDetails?.communityBanner}
            file="banner"
          />
        )}
        <div className="title_and_limit">
          <h3>Hive Logo</h3>
          <p onClick={removeHiveLogo} className="link text-sm">
            Remove Image
          </p>
        </div>
        <ImageDropzone urlSent={hiveDetails?.communityWebLogo!} file="logo" />
        {!videoUpload.stillInEC2 && (
          <>
            <div className="intro_video_edit_header">
              <h3>Introduction Video</h3>
              {!!hiveDetails?.introVideo && (
                <p onClick={handleChangeIntro} className="link text-sm">
                  {`${changeIntro ? "Cancel" : "Change Video"}`}
                </p>
              )}
            </div>
            {!!!hiveDetails?.introVideo ? (
              <>
                {videoUpload.videoFile ? (
                  <div className="intro_video_edit_wrapper">
                    <ReactPlayer
                      width="270px"
                      height="480px"
                      url={URL.createObjectURL(videoUpload.videoFile)}
                      controls
                      style={{
                        overflow: "hidden",
                        background: "black",
                      }}
                    />
                  </div>
                ) : (
                  <FileDrop />
                )}
              </>
            ) : (
              <>
                {changeIntro ? (
                  <>
                    {videoUpload.videoFile ? (
                      <div className="intro_video_edit_wrapper">
                        <ReactPlayer
                          width="270px"
                          height="480px"
                          url={URL.createObjectURL(videoUpload.videoFile)}
                          controls
                          style={{
                            overflow: "hidden",
                            background: "black",
                          }}
                        />
                      </div>
                    ) : (
                      <FileDrop />
                    )}
                  </>
                ) : (
                  <div className="intro_video_edit_wrapper">
                    <ReactPlayer
                      width="270px"
                      height="480px"
                      url={hiveDetails?.introVideo}
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
        )}
        <>
          {hiveSettings.isLoading || videoUpload.isLoading ? (
            <div className="nextBtn primaryBtn">
              <CircularProgress size={20} color="inherit" />
            </div>
          ) : (
            <div onClick={handleSave} className="nextBtn primaryBtn">
              Save
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default HiveMedia;
