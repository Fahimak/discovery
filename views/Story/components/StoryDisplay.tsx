"use client";
import { useHiveContext } from "context/Hive/hive";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import React, { useEffect, ChangeEvent } from "react";
import ReactPlayer from "react-player";

const StoryDisplay = () => {
  const stories = useStoryContext();
  const hive = useHiveContext();

  const storySegments = stories.storySegments;

  const currentStoryIdx = stories.currentStoryIndex;
  const currentStoryId = stories.currentStoryId;

  const title = stories.storyTitle;
  const description = stories.storyDesc;

  const hiveUuid = hive.hiveUuid;

  console.log(storySegments);

  useEffect(() => {
    if (storySegments[currentStoryIdx]) {
      stories.setStoryTitle(storySegments[currentStoryIdx].title);
      stories.setStoryDesc(storySegments[currentStoryIdx].description);
      stories.setActionLink(storySegments[currentStoryIdx].actionLink || "");
    }
  }, [currentStoryIdx, currentStoryId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.name === "title" &&
      stories.setStoryTitle(e.target.value.slice(0, 18));
    e.target.name === "description" &&
      stories.setStoryDesc(e.target.value.slice(0, 240));
  };

  const { editStorySegmentsBg } = useStoriesApi();

  const handleEditStory = () => {
    editStorySegmentsBg(
      description,
      storySegments[currentStoryIdx].storyUuid,
      title,
      storySegments[currentStoryIdx].type === "image",
      storySegments[currentStoryIdx].type === "video",
      storySegments[currentStoryIdx].colorCode || "",
      false,
      storySegments[currentStoryIdx].id,
      storySegments[currentStoryIdx].actionLink || "",
      storySegments[currentStoryIdx].segmentOrder
    );
  };

  return (
    <>
      {!!storySegments && storySegments.length > 0 && (
        <div
          onClick={handleEditStory}
          style={{
            backgroundColor: storySegments[currentStoryIdx].colorCode || "",
          }}
          className="story_display_wrapper"
        >
          {storySegments[currentStoryIdx].type === "video" ? (
            <ReactPlayer
              width="256.5px"
              height="456px"
              url={storySegments[currentStoryIdx].storyUrl || ""}
              controls
              style={{
                overflow: "hidden",
                borderRadius: "5px",
                background: "black",
              }}
            />
          ) : (
            <>
              {storySegments[currentStoryIdx].thumbnailUrl && (
                <img
                  src={storySegments[currentStoryIdx].thumbnailUrl || ""}
                  alt="story_thumbnail"
                  className="story_display_image_wrapper"
                />
              )}
            </>
          )}
          <div className="story_content_wrapper">
            <input
              name="title"
              value={title}
              onChange={handleInputChange}
              className="story_title"
              placeholder="Add title here..."
            />{" "}
            <input
              name="description"
              value={description}
              onChange={handleInputChange}
              className="story_desc"
              placeholder="Add description here..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StoryDisplay;
