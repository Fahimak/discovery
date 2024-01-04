import { Box, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import { AddLinkSVG, GreenTickSVG } from "components/SVG/SVG";
import { useHiveContext } from "context/Hive/hive";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import React from "react";

const AddLinkDrop = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const stories = useStoryContext();
  const hive = useHiveContext();

  const hiveUuid = hive.hiveUuid;
  const storyUuid = stories.storyUuid;

  const storyIdx = stories.currentStoryIndex;

  const storySegments = stories.storySegments;
  const colorCode = stories.color;

  const title = stories.storyTitle;
  const description = stories.storyDesc;

  const actionLink = stories.actionLink;

  const { editStorySegmentsBg } = useStoriesApi();

  const handleSave = () => {
    editStorySegmentsBg(
      description,
      storyUuid,
      title,
      storySegments[storyIdx].type === "image",
      storySegments[storyIdx].type === "video",
      storySegments[storyIdx].colorCode || "",
      false,
      storySegments[storyIdx].id,
      actionLink,
      storySegments[storyIdx].segmentOrder
    );

    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stories.setActionLink(e.target.value);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Add Link">
          <div onClick={handleClick}>
            <AddLinkSVG />
          </div>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 4,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="story_link_wrapper">
          <input
            value={actionLink}
            onChange={handleChange}
            className="story_link_item"
            placeholder="Enter link here"
          />
          <div onClick={handleSave} className="pointer">
            <GreenTickSVG />
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default AddLinkDrop;
