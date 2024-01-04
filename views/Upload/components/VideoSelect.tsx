import FileDrop from "components/FileDrop/FileDrop";
import { CheckmarkSVG } from "components/SVG/SVG";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import YoutubeUploadLink from "./YoutubeUploadLink";

const VideoSelect = () => {
  const videoUpload = useVideoUploadContext();

  const file = videoUpload.videoFile;

  useEffect(() => {
    videoUpload.setVideoFile(null);
  }, []);

  const isYoutube = videoUpload.isYoutube;

  useEffect(() => {
    videoUpload.setIsYoutube(0);
  }, []);

  return (
    <div className="video_select_container">
      {file === null ? (
        <>{isYoutube === 1 ? <YoutubeUploadLink /> : <FileDrop />}</>
      ) : (
        <div>
          <ReactPlayer
            width="270px"
            height="480px"
            url={URL.createObjectURL(file!)}
            controls
            style={{
              overflow: "hidden",
              borderRadius: "15px",
              background: "black",
            }}
          />
          <div
            className="video_change_status"
            onClick={() => {
              videoUpload.setVideoFile(null);
            }}
          >
            <div className="video_change_start">
              <CheckmarkSVG />
              <div className="hover_underline">Change Video</div>
            </div>
            <p className="secondary_text">
              {file.name.length > 10
                ? file.name.slice(0, 10) + "..."
                : file.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSelect;
