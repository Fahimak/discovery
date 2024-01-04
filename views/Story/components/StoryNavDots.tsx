import { SegmentItem } from "api/models/Story/story";
import React from "react";
import { useStoryContext } from "context/Story/stories";

const StoryNavDots = () => {
  const stories = useStoryContext();

  const storySegments = stories.storySegments;

  const storyIdx = stories.currentStoryIndex;

  const handleStoryChange = (data: SegmentItem, idx: number) => {
    stories.setCurrentStoryId(data.id);
    stories.setCurrentStoryIndex(idx);
  };

  return (
    <div className="story_nav_dots">
      {storySegments.map((data, idx) => {
        return (
          <div
            key={idx}
            style={{
              backgroundColor: data.colorCode || "",
            }}
            className={`story_nav_dot_item pointer ${
              idx === storyIdx ? "selected_nav_dot" : ""
            } `}
            onClick={() => handleStoryChange(data, idx)}
          >
            {data.thumbnailUrl && (
              <img
                src={data.thumbnailUrl || ""}
                alt="story_thumbnail"
                className="story_display_image_wrapper"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StoryNavDots;
