"use client";
import LineBreak from "components/LineBreak";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.bubble.css";
// import VideoComments from "./VideoComments";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CloseMediaSVG, DownArrowSVG, UpArrowSVG } from "components/SVG/SVG";
import YouTube from "react-youtube";
import { useChannelContext } from "context/Channel/channel";
import { useVideoContext } from "context/Videos/videos";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { VideoListItem } from "api/models/Videos/videoList";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import useVideoListApi from "hooks/apiHooks/Videos/useVideoListApi";
import { ChannelItemModel } from "api/models/Channel/channelDetails";

const style = {
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  // bgcolor: "#ffffff",
  outline: "none",
};

interface Props {
  currentVideo: VideoListItem;
  channel: ChannelItemModel;
}

const VideoView = ({ currentVideo, channel }: Props) => {
  const { launchLogin } = useHiveApi();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "yes") {
      launchLogin();
    }
  }, []);

  const { getVideoDetails } = useVideoListApi();

  useEffect(() => {
    getVideoDetails(channel.objChannel.channelUUID, currentVideo.videoUuid);
  }, [channel, currentVideo]);

  const navigate = useRouter();

  const video = useVideoContext();

  const channelContext = useChannelContext();
  const videoListResp = video.videoList;
  const currentVideoIndex = video.currentVideoIdx;

  const [videoOpen, setVideoOpen] = useState(true);

  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  const handleGoBack = () => {
    navigate.push(`/channels/${channel.objChannel.channelUUID}`);
    // navigate.push(`/channels/${currentVideo?.channelUuid}`);
    setVideoOpen(false);
  };

  const handleNextVideo = () => {
    video.setCurrentVideo(video.videoList?.videoList[currentVideoIndex + 1]);
    video.setCurrentVideoIdx(currentVideoIndex + 1);
    // dispatch(setNextVideo());
  };

  const handlePrevVideo = () => {
    video.setCurrentVideo(video.videoList?.videoList[currentVideoIndex - 1]);
    video.setCurrentVideoIdx(currentVideoIndex - 1);
    // dispatch(setPrevVideo());
  };

  const handlePitchClick = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  function extractYoutubeId(url: string): string {
    const regex = /v=([^\&\?]+)/;
    const result = url.match(regex);

    return result ? result[1] : "";
  }

  return (
    <Modal
      open={videoOpen}
      onClose={handleGoBack}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="z-index-max">
        <div className="vhive-1qg2388-DivBrowserModeContainer e11s2kul0">
          <div onClick={handleGoBack} className="vhive_close_media_btn">
            <CloseMediaSVG />
          </div>
          <div className="vhive-1tunefa-DivVideoContainer e11s2kul26">
            <div className="vhive-7tjqm6-DivBlurBackground e11s2kul8">
              <div className="vhive-16ognrj-DivVideoWrapper e11s2kul9">
                <div className="vhive-1jxhpnd-DivContainer e1yey0rl0">
                  <div className="vhive-1h63bmc-DivBasicPlayerWrapper e1yey0rl2">
                    {/* <div></div> */}
                    <div className="ch-live-broadcast__main__live__media-container ch-live-broadcast__main__media-container">
                      {video.currentVideo?.channelType === "YOUTUBE" &&
                      !!video.currentVideo?.horizontalVideoURL ? (
                        <div className="youtube_video_container">
                          <YouTube
                            videoId={extractYoutubeId(
                              video.currentVideo.horizontalVideoURL
                            )}
                          />
                        </div>
                      ) : (
                        <ReactPlayer
                          width="100%"
                          height="100%"
                          url={video.currentVideo?.sourceURL}
                          controls
                          style={{
                            overflow: "hidden",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vhive_media_arrow_container">
              {currentVideoIndex > 0 && (
                <div onClick={handlePrevVideo} className="media_arrow_design">
                  <UpArrowSVG />
                </div>
              )}
              {videoListResp &&
                currentVideoIndex + 1 < videoListResp?.videoList.length && (
                  <div onClick={handleNextVideo} className="media_arrow_design">
                    <DownArrowSVG />
                  </div>
                )}
            </div>
          </div>
          <div className="vhive-3q30id-DivContentContainer e1mecfx00 scrollable-y">
            <div className="vhive_media-info">
              <LineBreak />
              <div className="vhive_media_info_spacing">
                {/* <div className="vhive_media_info_heading_spacing"> */}
                <div>
                  <h2>{channel?.objChannel.channelName || ""}</h2>
                  <hr></hr>
                </div>
                {/* <div className="vh_media_title_second_headers"> */}
                <h3>{currentVideo?.name}</h3>
                <div className="flex-wrap tags_wrapper">
                  {currentVideo?.tags.map((tag, idx) => {
                    return (
                      <span className="tags" key={idx}>
                        #{tag}
                      </span>
                    );
                  })}
                </div>
                {!!video.currentVideo?.horizontalPreviewImage && (
                  <div
                    onClick={() =>
                      handlePitchClick(currentVideo?.horizontalPreviewImage!)
                    }
                    className="link text-sm"
                  >
                    View Pitch Deck
                  </div>
                )}
                {video.currentVideo?.channelType !== "YOUTUBE" &&
                  !!video.currentVideo?.horizontalVideoURL && (
                    <div
                      onClick={() =>
                        handlePitchClick(currentVideo?.horizontalVideoURL!)
                      }
                      className="link text-sm"
                    >
                      Visit Product
                    </div>
                  )}
                <p className="tags text-sm more_spacing_tags_posted_by">
                  Posted by {currentVideo?.userName}
                </p>
                {/* </div> */}
                {/* </div> */}
                {/* {!!currentVideo?.attribute3 && currentVideo?.attribute3[0] && (
                  <div className="minus_margins_textbox video_view_desc_sizing">
                  
                  <div>
                  <ReactQuill
                  className="react-quill"
                  readOnly
                  value={currentVideo?.attribute3[0]}
                  theme="bubble"
                  />
                  </div>
                  </div>
                )} */}
              </div>
            </div>
            {/* <div className="hr_padding_vw_container">
              <hr className="hr_padding_vw"></hr>
              </div>
              <h3 className="heading_placement_comments">Comments</h3>
              <div className="video_comments_container">
              <VideoComments />
            </div> */}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default VideoView;
