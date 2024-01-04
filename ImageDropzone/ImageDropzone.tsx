"use client";
import Cropzone from "components/CroppingZone";
import { UploadImageSVG } from "components/SVG/SVG";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  file: string;
  urlSent?: string;
  bannerUrl?: string;
}

const ImageDropzone = ({ file, urlSent, bannerUrl }: Props) => {
  const hiveSettings = useHiveSettingsContext();

  useEffect(() => {
    hiveSettings.setWebUrl("");
    hiveSettings.setBannerUrl("");
    hiveSettings.setImageUploaded(false);
  }, []);

  const imageUploaded = hiveSettings.imageUploaded;
  const bannerUploaded = hiveSettings.bannerUploaded;
  const logoFile = hiveSettings.webUrl;
  const bannerFile = hiveSettings.bannerUrl;
  const hiveConfig = useHiveConfigContext();

  const [image, setImage] = useState<string | ArrayBuffer>("");
  const handleDrop = (acceptedFiles: File[]) => {
    setImage("");
    handleCropClose();
    setSubmitClick(false);
    /// Get the first file
    const file = acceptedFiles[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      if (file.size > 100000000) {
        hiveConfig.setAlertOpen({
          type: "info",
          message: "Please upload images less than 80 mb",
        });
      } else {
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
      hiveConfig.setAlertOpen({
        type: "error",
        message: "Invalid file type, please pass an image file .jpg or .png",
      });
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

  const [onSubmitClick, setSubmitClick] = useState(false);

  return (
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
        {file === "banner" ? (
          <div className="upload_content_banner_wrapper">
            {bannerUploaded ? (
              <img
                alt="banner_img"
                className="uploaded_banner_image"
                src={`data:image/jpeg;base64,${bannerFile}`}
              />
            ) : (
              <>
                {bannerUrl ? (
                  <img
                    src={bannerUrl}
                    className="uploaded_banner_image"
                    alt="changingLogo"
                  />
                ) : (
                  <UploadImageSVG />
                )}
              </>
            )}
            <div className="upload_text_wrapper">
              <div>
                <h4 className="">{`Drag and drop image here or click to ${
                  bannerUploaded ? "change" : "upload"
                }`}</h4>
                <p className="text-gray-400 font-semibold text-sm">
                  Recommended size: 300kb
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="upload_content_wrapper">
            {imageUploaded ? (
              <img
                className="uploaded_image"
                src={`data:image/jpeg;base64,${logoFile}`}
              />
            ) : (
              <>
                {urlSent ? (
                  <img
                    src={urlSent}
                    className="uploaded_image"
                    alt="changingLogo"
                  />
                ) : (
                  <UploadImageSVG />
                )}
              </>
            )}
            <div className="upload_text_wrapper">
              <div>
                <h4 className="">{`Drag and drop image here or click to ${
                  imageUploaded ? "change" : "upload"
                }`}</h4>
                <p className="text-gray-400 font-semibold text-sm">
                  Recommended size: 300kb
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {image && !onSubmitClick && (
        <Cropzone
          file={file}
          openCrop={openCrop}
          handleCropClose={handleCropClose}
          image={image}
          setSubmitClick={setSubmitClick}
        />
      )}
    </div>
  );
};

export default ImageDropzone;
