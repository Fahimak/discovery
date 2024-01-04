import LineBreak from "components/LineBreak";
import React, { useState, useEffect, ChangeEvent } from "react";
import "react-quill/dist/quill.snow.css";
import TokenInput from "react-customize-token-input";
import "views/Upload/components/small-token-input.scss";
import "./react-quill.scss";
import ChannelDropdown from "components/ChannelDropdown/ChannelDropdown";
import { useChannelContext } from "context/Channel/channel";
import { useHiveContext } from "context/Hive/hive";
import { useRouter } from "next/navigation";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import useUploadApi from "hooks/apiHooks/Videos/useUploadApi";
import { CircularProgress } from "@mui/material";
import ReactQuill from "react-quill";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

const UploadInfo = () => {
  const channel = useChannelContext();
  const hive = useHiveContext();

  const channelUuid = hive.channelList;
  const videoUpload = useVideoUploadContext();
  const thumbnail = videoUpload.thumbnail;

  const { ToastSuccess, ToastInfo, ToastError } = useHiveConfigContext();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const navigate = useRouter();

  const hiveUuid = hive.hiveUuid;

  const isYoutube = videoUpload.isYoutube;

  const youtubeUrl = videoUpload.youtubeUrl;

  const { YTUploadContent, uploadVideo } = useUploadApi();

  const handleYoutubeVideoUpload = () => {
    YTUploadContent(videoTitle, [data], values.slice(0, 5));
  };

  const handleVideoUpload = async () => {
    isYoutube === 1
      ? handleYoutubeVideoUpload()
      : uploadVideo(videoTitle, [data], values.slice(0, 5));
  };

  const [data, setData] = useState("");

  function handleTextBox(event: string) {
    setData(event);
  }

  const [videoTitle, setVideoTitle] = useState("");
  const [titleRemaining, setTitleRemaining] = useState(20);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value.slice(0, 20));
    setTitleRemaining(20 - e.target.value.slice(0, 20).length);
  };

  const [values, setValues] = useState([]);

  const handleError = () => {
    if (videoTitle.length < 1) {
      ToastError("Please enter video title");
    }
  };

  const goBack = () => {
    navigate.back();
  };

  return (
    <div className="upload_info_container">
      <div className="upload_info_margins">
        <h3>Upload Video</h3>
        <p className="text-sm">Post a video to this channel</p>
      </div>
      <div>
        <div className="upload_info__content_spacing">
          <ChannelDropdown />
        </div>
        <h5 className="upload_headings">Title</h5>
        <div className="upload_info_margins upload_title_input">
          <input
            className={`${
              videoTitle.length > 0 ? "video_upload_title" : "video_title_empty"
            }`}
            value={videoTitle}
            onInput={handleTitleChange}
            placeholder="Untitled"
          />
          <div className="character_limit text-sm">{videoTitle.length}/20</div>
        </div>
        <div className="upload_info_margins">
          <h4 className="upload_headings">Tags</h4>
          <TokenInput
            separators={[" ", ",", ";"]}
            tokenValues={values.slice(0, 5)}
            onTokenValuesChange={setValues}
            className=""
            placeholder={`Tags separated by commas`}
          />
        </div>
        <div className="text_box_container">
          <h4 className="upload_headings">Description</h4>
          <LineBreak />

          <ReactQuill
            className="text_box"
            theme="snow"
            value={data}
            onChange={(e) => handleTextBox(e)}
          />
        </div>
        <LineBreak />
      </div>
      <div className="button_rows">
        <div onClick={goBack} className="secondaryBtn half_width">
          Discard
        </div>
        {(thumbnail || isYoutube === 1) && videoTitle.length > 1 ? (
          <div onClick={handleVideoUpload} className="primaryBtn half_width">
            Post
          </div>
        ) : (
          <div onClick={handleError} className="disabledBtn half_width">
            Post
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadInfo;
