import { Box, Modal } from "@mui/material";
import FileDrop from "components/FileDrop/FileDrop";
import { CloseBlackSVG, UploadAiSVG } from "components/SVG/SVG";
import StoryCropzone from "components/StoryCropzone/StoryCropzone";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useStoryContext } from "context/Story/stories";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 522,
  height: 630,
  bgcolor: "#fff",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2,
};

interface Props {
  openDrop: boolean;
  setOpenDrop: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
}

const StoryDropzone = ({ file, openDrop, setOpenDrop }: Props) => {
  const upload = useVideoUploadContext();
  const stories = useStoryContext();

  const thumbnail = upload.thumbnail;
  const uploadedVideoFile = upload.videoFile;

  const { ToastError, ToastSuccess, ToastInfo } = useHiveConfigContext();

  useEffect(() => {
    stories.setCompressedImgUrl("");
    stories.setImageUploaded(false);
  }, []);

  const imageUploaded = stories.imageUploaded;
  const imgFile = stories.compressedImgUrl;

  const [image, setImage] = useState<string | ArrayBuffer>("");
  const handleDrop = (acceptedFiles: File[]) => {
    setImage("");
    handleCropClose();
    setSubmitClick(false);
    /// Get the first file
    const file = acceptedFiles[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      if (file.size > 100000000) {
        ToastInfo("Please upload images less than 80 mb");
      } else {
        upload.setContentType(file.type);
        // Create a new FileReader
        const reader = new FileReader();

        // Set the image state when the file has loaded
        reader.onload = (e) => {
          setImage(e.target?.result!);
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
        handleCropOpen();
      }
    } else {
      ToastError("Invalid file type, please pass an image file .jpg or .png");
    }
  };

  const onDropAccepted = useCallback(handleDrop, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: onDropAccepted,
  });

  const [openCrop, setOpenCrop] = useState(false);
  const handleCropClose = () => {
    setOpenCrop(false);
  };
  const handleCropOpen = () => {
    setOpenCrop(true);
  };

  const desc = stories.storyDesc;
  const title = stories.storyTitle;
  const storyUuid = stories.storyUuid;

  const storySegments = stories.storySegments;
  const idx = stories.currentStoryIndex;
  const contentType = upload.contentType;

  const storyId = stories.currentStoryId;

  const hive = useHiveContext();

  const hiveUuid = hive.hiveUuid;

  const [onSubmitClick, setSubmitClick] = useState(false);

  const { editStorySegments } = useStoriesApi();

  const handleEditSegment = () => {
    file === "video" && stories.setUploadedFile(uploadedVideoFile);
    editStorySegments(
      desc,
      storyUuid,
      title,
      file !== "video",
      file === "video",
      "",
      true,
      storySegments[idx].id,
      storySegments[idx].actionLink || "",
      storySegments[idx].segmentOrder,
      file === "video" ? thumbnail : ""
    );
    setOpenDrop(false);
  };

  const clearVideo = () => {
    upload.setVideoFile(null);
  };

  return (
    <Modal
      open={openDrop}
      onClose={() => setOpenDrop(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="" sx={style}>
        {file === "video" ? (
          <>
            <div className="title_and_limit story_drop_header">
              <h3>Add Video</h3>
              <div className="pointer" onClick={() => setOpenDrop(false)}>
                <CloseBlackSVG />
              </div>
            </div>
            {!!thumbnail && !!uploadedVideoFile ? (
              <>
                <div className="story_video_view_wrapper">
                  <p
                    className="link story_video_change_title"
                    onClick={clearVideo}
                  >
                    Change
                  </p>
                  <ReactPlayer
                    width="256.5px"
                    height="456px"
                    url={URL.createObjectURL(uploadedVideoFile)}
                    controls
                    style={{
                      overflow: "hidden",
                      borderRadius: "15px",
                      background: "black",
                    }}
                  />
                  <p
                    className="story_createBtn w_full primaryBtn"
                    onClick={handleEditSegment}
                  >
                    Add Video
                  </p>
                </div>
              </>
            ) : (
              <FileDrop />
            )}
          </>
        ) : (
          <>
            <div className="title_and_limit story_drop_header">
              <h3>Add Image</h3>
              <div className="pointer" onClick={() => setOpenDrop(false)}>
                <CloseBlackSVG />
              </div>
            </div>
            <div className="cursor-pointer">
              <div
                {...getRootProps()}
                className={`upload_wrapper dropzone ${
                  isDragActive ? "dropzone--isActive border-blue-600" : ""
                } ${isDragAccept ? "dropzone--isAccept border-blue-600" : ""} ${
                  isDragReject ? "dropzone--isReject border-red-600" : ""
                }`}
              >
                <input accept="image/*" {...getInputProps()} />

                <div className="upload_story_content_wrapper">
                  {stories.compressedImgUrl ? (
                    <img
                      className="uploaded_story_image"
                      src={`data:image/jpeg;base64,${imgFile}`}
                    />
                  ) : (
                    <UploadAiSVG />
                  )}
                  <div className="upload_text_wrapper">
                    <div>
                      <h4 className="">{`Drag and drop image here or click to ${
                        stories.compressedImgUrl ? "change" : "upload"
                      }`}</h4>
                      <p className="text-gray-400 font-semibold text-sm">
                        Recommended size: 300kb
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {image && !onSubmitClick && (
                <StoryCropzone
                  file={file}
                  openCrop={openCrop}
                  handleCropClose={handleCropClose}
                  image={image}
                  setSubmitClick={setSubmitClick}
                />
              )}
            </div>
            {stories.compressedImgUrl && (
              <div
                onClick={handleEditSegment}
                className="story_createBtn w_full primaryBtn"
              >
                Add Image
              </div>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default StoryDropzone;
