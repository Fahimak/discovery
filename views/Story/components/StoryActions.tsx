import {
  StoryImgSVG,
  StoryVidSVG,
  StoryAddSVG,
  StoryRemoveSVG,
} from "components/SVG/SVG";
import StoryDropzone from "components/StoryDropzone/StoryDropzone";
import { useHiveContext } from "context/Hive/hive";
import { useStoryContext } from "context/Story/stories";
import React, { useState, useEffect } from "react";
import { TwitterPicker } from "react-color";
import AddLinkDrop from "./AddLinkDrop";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";

const StoryActions = () => {
  const [openDrop, setOpenDrop] = useState(false);

  const [file, setFile] = useState("img");

  const stories = useStoryContext();
  const hive = useHiveContext();

  const hiveUuid = hive.hiveUuid;
  const storyUuid = stories.storyUuid;

  const storyId = stories.currentStoryId;
  const storyIdx = stories.currentStoryIndex;

  const storySegments = stories.storySegments;
  const colorCode = stories.color;

  const title = stories.storyTitle;
  const description = stories.storyDesc;

  useEffect(() => {
    stories.setColor("#B4CEBE");
  }, [storyIdx]);

  const handleImageUpload = () => {
    setFile("img");
    setOpenDrop(true);
  };

  const handleVideoUpload = () => {
    setFile("video");
    setOpenDrop(true);
  };

  const handleAddSegment = () => {
    addStorySegments(
      stories.storySegments[stories.currentStoryIndex].segmentOrder + 1
    );
  };

  const { ToastError } = useHiveConfigContext();

  const handleRemoveSegment = () => {
    if (storySegments.length > 1) {
      removeStorySegments(storyId);
      stories.setCurrentStoryId(0);
      stories.setCurrentStoryIndex(0);
    } else {
      ToastError("Sorry, a story must have atleast one frame");
    }
  };

  const handleColorChange = (color: any) => {
    stories.setColor(color.hex);
  };

  const [openColor, setOpenColor] = useState(false);

  const { editStorySegmentsBg, addStorySegments, removeStorySegments } =
    useStoriesApi();

  const handleColorClick = () => {
    if (openColor) {
      editStorySegmentsBg(
        description,
        storyUuid,
        title,
        false,
        false,
        colorCode,
        false,
        storySegments[storyIdx].id,
        storySegments[storyIdx].actionLink || "",
        storySegments[storyIdx].segmentOrder
      );
    }
    setOpenColor(!openColor);
  };

  return (
    <>
      {openColor && <TwitterPicker onChange={handleColorChange} />}
      <div className="story_actions_container">
        <div className="pointer story_action_item" onClick={handleColorClick}>
          <div className="action_item_icon">
            <div
              style={{ backgroundColor: colorCode }}
              className="bg_color_story"
            ></div>
          </div>
          <p className="text_xs">BG color</p>
        </div>
        <div className="pointer story_action_item" onClick={handleImageUpload}>
          <div className="action_item_icon">
            <StoryImgSVG />
          </div>
          <p className="text_xs">Image</p>
        </div>
        <div onClick={handleVideoUpload} className="pointer story_action_item">
          <div className="action_item_icon">
            <StoryVidSVG />
          </div>
          <p className="text_xs">Video</p>
        </div>
        {/* <StoryTextSVG /> */}
        <div onClick={handleAddSegment} className="pointer story_action_item">
          <div className="action_item_icon">
            <StoryAddSVG />
          </div>
          <p className="text_xs">Add</p>
        </div>
        <div
          onClick={handleRemoveSegment}
          className="pointer story_action_item"
        >
          <div className="action_item_icon">
            <StoryRemoveSVG />
          </div>
          <p className="text_xs">Remove</p>
        </div>
        <div
          // onClick={handleRemoveSegment}
          className="pointer story_action_item"
        >
          <div className="action_item_icon">
            <AddLinkDrop />
          </div>
          <p className="text_xs">Add Link</p>
        </div>
      </div>
      {openDrop && (
        <StoryDropzone
          openDrop={openDrop}
          setOpenDrop={setOpenDrop}
          file={file}
        />
      )}
    </>
  );
};

export default StoryActions;
