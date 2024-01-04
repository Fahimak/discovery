"use client";
import BackButton from "components/BackButton/BackButton";
import LineBreak from "components/LineBreak/LineBreak";
import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useStoryContext } from "context/Story/stories";
import { useHiveContext } from "context/Hive/hive";
import { useRouter } from "next/navigation";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";

const CreateStory = () => {
  const stories = useStoryContext();
  const hive = useHiveContext();

  const title = stories.storyTitle;
  const desc = stories.storyDesc;

  const hiveDetails = hive.hiveDetails;

  const isFetching = stories.isFetching;
  const isCreated = stories.storyCreated;

  useEffect(() => {
    stories.setStoryTitle("");
    stories.setStoryDesc("");
    stories.setStoryUuid("");
    stories.setStorySegments([]);
    stories.setCurrentStoryIndex(0);
  }, []);

  const { createStory } = useStoriesApi();

  const handleCreateStory = () => {
    hiveDetails && createStory();
  };

  const navigate = useRouter();

  useEffect(() => {
    if (isCreated) {
      navigate.push("/story/create/publish");
      stories.setStoryCreated(false);
    }
  }, [isCreated]);

  return (
    <div className="create_story_container">
      <LineBreak />
      <div className="backBtn_spacing">
        <BackButton to={"/story"} />
      </div>
      <LineBreak />
      <div className="title_and_limit">
        <p className="tags text-sm font-bold">Story title</p>
        <div className="character_limit text-sm">{title.length}/18</div>
      </div>
      <LineBreak />
      <input
        value={title}
        onChange={(e) => {
          stories.setStoryTitle(e.target.value.slice(0, 18));
        }}
        placeholder="Give a title for your story"
        className="input_border text_padding input_width_full"
      />
      <LineBreak />
      <div className="title_and_limit">
        <p className="tags text-sm font-bold">Story Description</p>
        <div className="character_limit text-sm">{desc.length}/240</div>
      </div>{" "}
      <LineBreak />
      <input
        value={desc}
        onChange={(e) => {
          stories.setStoryDesc(e.target.value.slice(0, 240));
        }}
        placeholder="Give a description for your story"
        className="input_border text_padding input_width_full"
      />
      <LineBreak />
      <p className="tags text-sm font-bold">Templates</p>
      <LineBreak />
      <div className="story_template">
        <img
          src="https://images.veehive.ai/webApp/storyTemplate.png"
          alt=""
          className="ai_template_img story_template_img"
        />
        <p className="text-sm font-bold story_template_description">
          Default Template
        </p>
      </div>
      <LineBreak />
      <>
        {isFetching ? (
          <div className="story_template_nextBtn primaryBtn">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <div>
            {title.length > 0 && desc.length > 0 ? (
              <div
                onClick={handleCreateStory}
                className="primaryBtn story_template_nextBtn"
              >
                Continue
              </div>
            ) : (
              <div className="story_template_nextBtn disabledBtn">Continue</div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default CreateStory;
