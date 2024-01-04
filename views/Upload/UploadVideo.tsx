"use client";
import { CircularProgress, Dialog } from "@mui/material";
import IslandLayout from "components/IslandLayout";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHiveContext } from "context/Hive/hive";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import useUploadApi from "hooks/apiHooks/Videos/useUploadApi";
import VideoUploadTabs from "./components/VideoUploadTabs";
import VideoSelect from "./components/VideoSelect";
import UploadInfo from "./components/UploadInfo";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

const UploadVideo = () => {
  const hive = useHiveContext();
  const videoUpload = useVideoUploadContext();

  const channelList = hive.channelList;
  const isUploading = videoUpload.isLoading;
  const stillInEC2 = videoUpload.stillInEC2;

  const hiveUuid = hive.hiveUuid;

  const { ToastInfo } = useHiveConfigContext();

  const navigate = useRouter();

  const { readyToUpload } = useUploadApi();

  useEffect(() => {
    readyToUpload();
  }, [stillInEC2]);

  useEffect(() => {
    if (stillInEC2) {
      ToastInfo("Setting up your hive! Upload content after 10-15 min.");
      navigate.push("/home");
    }
  }, [stillInEC2]);

  return (
    <>
      <div className="upload_container">
        {channelList.length > 1 && (
          <div className="upload_section">
            <IslandLayout>
              <div className="upload_info">
                <UploadInfo />
              </div>
            </IslandLayout>
          </div>
        )}
        <div className="upload_section">
          <IslandLayout>
            <div className="vid_upload_tabs_wrapper">
              <VideoUploadTabs />
            </div>

            <div className="video_select_wrapper">
              <VideoSelect />
            </div>
          </IslandLayout>
        </div>
      </div>
      {/* <Dialog open={isUploading}>
        <div className="popup_dialogue"> */}
      <Dialog open={isUploading}>
        <div className="loader_padding">
          <CircularProgress size={30} color="inherit" />
        </div>
      </Dialog>
      {/* </div>
      </Dialog> */}
    </>
  );
};

export default UploadVideo;
