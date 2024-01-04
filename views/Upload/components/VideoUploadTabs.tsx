import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useVideoUploadContext } from "context/Videos/videoUpload";

const VideoUploadTabs = () => {
  const tabs = ["Video Upload", "Upload Using Youtube"];

  const videoUpload = useVideoUploadContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    videoUpload.setIsYoutube(newValue);
  };

  const selectedTab = videoUpload.isYoutube;

  return (
    <Tabs value={selectedTab} onChange={handleChange} aria-label="channel tabs">
      {tabs.map((tab, idx) => {
        return (
          <Tab
            key={idx}
            style={{
              width: "50%",
              height: "20px",
              fontFamily: "IBM Plex Sans Condensed",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "140%",
              textAlign: "center",
              letterSpacing: "0.02em",
              color: "#1C1B1F",
            }}
            label={tab}
          />
        );
      })}
      {/* <Tab label="About" />
      <Tab label="Members" />
      <Tab label="Settings" /> */}
    </Tabs>
  );
};

export default VideoUploadTabs;
