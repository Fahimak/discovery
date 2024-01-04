"use client";
import BackButton from "components/BackButton";
import LineBreak from "components/LineBreak";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import StoryDisplay from "../components/StoryDisplay";
import DragReplace from "../components/DragReplace";
import StoryActions from "../components/StoryActions";

const PublishStory = () => {
  const stories = useStoryContext();

  const storyUuid = stories.storyUuid;

  const navigate = useRouter();

  const storySegments = stories.storySegments;

  const storyIdx = stories.currentStoryIndex;

  useEffect(() => {
    !!!storyUuid && navigate.push("..");
  }, [storyUuid]);

  const { getStorySegments, getStoryItem, publishStory } = useStoriesApi();

  useEffect(() => {
    getStorySegments();
    getStoryItem(storyUuid);
  }, [storyUuid]);

  const handlePublish = () => {
    publishStory();
    navigate.push("/story");
  };

  return (
    <div className="create_story_container">
      <LineBreak />
      <div className="backBtn_spacing">
        <BackButton />
      </div>
      <div className="story_edit_container">
        <div onClick={handlePublish} className="story_publish_btn secondaryBtn">
          Publish
        </div>
        <StoryDisplay />
        <div className="story_nav_dots_container">
          {/* <StoryNavDots /> */}
          <DragReplace originalItems={storySegments} currentIdx={storyIdx} />
        </div>
        <StoryActions />
      </div>
      <LineBreak />
    </div>
  );
};

export default PublishStory;
