"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Cropper from "react-easy-crop";
import { blobToURL, fromURL } from "image-resize-compress";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";

interface Props {
  openCrop: boolean;
  handleCropClose: any;
  image: any;
  setSubmitClick: any;
  file: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 560,
  height: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 8,
};

const Cropzone = ({
  openCrop,
  handleCropClose,
  image,
  setSubmitClick,
  file,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [compUrl, setCompUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const hiveSettings = useHiveSettingsContext();

  const handleBlob = (base64: string) => {
    // quality value for webp and jpeg formats.
    // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
    const width = 0;
    // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
    const height = 0;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = "webp";

    // note only the sourceUrl argument is required
    fromURL(base64, 90, width, height, "png").then((firstBlob) => {
      const quality = (25000 / firstBlob.size) * 100;

      if (file !== "banner") {
        fromURL(base64, 15, width, height, format).then((blob) => {
          // will output the converted blob file
          //Do sumn with blob file
          // will generate a url to the converted file
          blobToURL(blob).then((url) => {
            hiveSettings.setMobileUrl(url.split(",")[1]);
          });
        });
      }
      fromURL(
        base64,
        firstBlob.size < 300000
          ? 90
          : firstBlob.size < 500000
          ? 80
          : firstBlob.size < 700000
          ? 60
          : 45,
        width,
        height,
        format
      ).then((blob) => {
        // will output the converted blob file
        //Do sumn with blob file
        // will generate a url to the converted file
        blobToURL(blob).then((url) => {
          setUploading(false);
          setCompUrl(url);
        });
      });
    });
  };
  return (
    <Modal
      open={openCrop}
      onClose={handleCropClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="cropzone_box_container" sx={style}>
        <div className="cropzone_header_wrapper">
          <div>
            <h3 className="">Crop your image</h3>
            <p className="">Select the best fit for your image</p>
          </div>

          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleCropClose}
            className="cursor-pointer"
          />
        </div>
        {image && (
          <div className="cropzone_content_container">
            <div className="cropzone_cropper_container">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                onZoomChange={setZoom}
                aspect={
                  file === "story"
                    ? 1080 / 1920
                    : file === "logo"
                    ? 1 / 1
                    : file === "channel"
                    ? 173 / 221
                    : 960 / 208
                }
                onCropChange={setCrop}
                onCropComplete={(croppedArea, croppedAreaPixels) => {
                  const img = new Image();
                  img.src = image as string;
                  img.onload = async () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;
                    canvas.width = croppedAreaPixels.width;
                    canvas.height = croppedAreaPixels.height;
                    await ctx.drawImage(
                      img,
                      croppedAreaPixels.x,
                      croppedAreaPixels.y,
                      croppedAreaPixels.width,
                      croppedAreaPixels.height,
                      0,
                      0,
                      canvas.width,
                      canvas.height
                    );
                    // console.log(canvas.toDataURL());
                    handleBlob(canvas.toDataURL());
                    setUploading(true);
                  };
                }}
              />
            </div>
          </div>
        )}
        <div className="cropzone_btn">
          {uploading ? (
            <div className="absolute bottom-5 right-8 px-5">
              <CircularProgress color="inherit" size={20} />
            </div>
          ) : (
            <button
              className="secondaryBtn"
              onClick={() => {
                if (file === "banner") {
                  hiveSettings.setBannerUrl(compUrl.split(",")[1]);
                  hiveSettings.setBannerUploaded(true);
                  hiveSettings.setBannerUrlChanged(true);
                } else {
                  hiveSettings.setWebUrl(compUrl.split(",")[1]);
                  hiveSettings.setUrlChanged(true);
                  hiveSettings.setImageUploaded(true);
                }

                handleCropClose();
                setSubmitClick(true);
              }}
            >
              Done
            </button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default Cropzone;
