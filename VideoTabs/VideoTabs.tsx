"use client";
import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useChannelContext } from "context/Channel/channel";
import { useVideoContext } from "context/Videos/videos";
import useVideoListApi from "hooks/apiHooks/Videos/useVideoListApi";

const VideoTabs = () => {
  const child = useChildComponentsContext();
  const channel = useChannelContext();
  const video = useVideoContext();

  const videoTabs = child.videoTabs;
  const channelUuid = channel.activeChannelUuid;

  const activeTab = video.activeTab;

  const pageNo = video.pageNo;

  const { getVideoList } = useVideoListApi();

  //   const pendingVideos = useAppSelector(getTotalPendingVideosSelector);

  //   useEffect(() => {
  //     (video.setActiveTab(activeTab));
  //   }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    video.setActiveTab(newValue);
    getVideoList(newValue);
  };

  return (
    <Tabs value={activeTab} onChange={handleChange} aria-label="video tabs">
      {videoTabs.map((tab, idx) => {
        return (
          <Tab
            style={{
              width: "25%",
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
            key={idx}
            label={
              <div className="vid_tab_display">
                {tab.componentName}
                {/* {tab.componentName === "Pending" && !!pendingVideos && (
                  <span className="readed_tab_badge" />
                )} */}
              </div>
            }
          />
        );
      })}
    </Tabs>
  );
};

export default VideoTabs;
