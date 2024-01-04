import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { VideoListItem } from "api/models/Videos/videoList";
import MenuItem from "@mui/material/MenuItem";
import { useChannelContext } from "context/Channel/channel";
import { useRouter } from "next/navigation";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useVideoContext } from "context/Videos/videos";
import useVideoListApi from "hooks/apiHooks/Videos/useVideoListApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #f0f0f0",
  borderRadius: 3,
  padding: 2,
  boxShadow: 24,
};

const ITEM_HEIGHT = 48;

interface Props {
  currentVideo: VideoListItem;
}

const VideoKebab = ({ currentVideo }: Props) => {
  const channel = useChannelContext();
  const videoUpload = useVideoUploadContext();
  const video = useVideoContext();

  const options =
    video.activeTab === 0
      ? ["Edit", "Archive", "Reject"]
      : video.activeTab === 1
      ? ["Edit", "Approve", "Archive", "Reject"]
      : video.activeTab === 2
      ? ["Edit", "Approve", "Reject"]
      : ["Edit", "Approve", "Archive"];

  const channelUuid = channel.activeChannelUuid;

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { updateVideoStatus } = useVideoListApi();

  const handleClose = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    video.setCurrentVideo(currentVideo);
    //   e.currentTarget.innerText === "Edit" && handleEditOpen();
    e.currentTarget.innerText === "Approve" &&
      updateVideoStatus(currentVideo, "Ready");
    e.currentTarget.innerText === "Archive" &&
      updateVideoStatus(currentVideo, "ARCHIVED");
    e.currentTarget.innerText === "Pending" &&
      updateVideoStatus(currentVideo, "PENDING");
    e.currentTarget.innerText === "Reject" &&
      updateVideoStatus(currentVideo, "Rejected");
    if (e.currentTarget.innerText === "Edit") {
      router.push(`videos/${currentVideo.videoUuid}/edit`);
      videoUpload.setVideoFile(null);
    }
    //   e.currentTarget.innerText === "Delete" && handleReasonsOpen();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className=""
      >
        <MoreVertIcon className="bg-kebab" htmlColor="#ffffff" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 3,
            width: "12ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={(e) => handleClose(e)}>
            <p className="text-sm">{option}</p>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default VideoKebab;
