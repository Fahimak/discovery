"use client";
import BackButton from "components/BackButton/BackButton";
import LineBreak from "components/LineBreak/LineBreak";
import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import PageLayout from "components/PageLayout/PageLayout";
import IslandLayout from "components/IslandLayout/IslandLayout";
import ImageDropzone from "components/ImageDropzone/ImageDropzone";
import { useStoryContext } from "context/Story/stories";
import { useHiveContext } from "context/Hive/hive";
import { useVideoUploadContext } from "context/Videos/videoUpload";
import { useRouter } from "next/navigation";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";

const EditStory = () => {
  const stories = useStoryContext();
  const hive = useHiveContext();

  const title = stories.storyTitle;
  const desc = stories.storyDesc;

  const hiveDetails = hive.hiveDetails;

  const isFetching = stories.isFetching;

  const story = stories.storyItem;

  const storyUuid = stories.storyUuid;

  const upload = useVideoUploadContext();

  useEffect(() => {
    stories.setStoryTitle(story?.storyTitle || "");
    stories.setStoryDesc(story?.storyDescription || "");
    stories.setStoryUuid(story?.storyUuid || "");
    stories.setCurrentStoryIndex(0);
  }, []);

  const { editStory } = useStoriesApi();

  const handleEditStory = () => {
    if (story) {
      editStory();
      navigate.push("/story/create/publish");
    }
  };

  const navigate = useRouter();

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="edit_story_container">
          <LineBreak />
          <h2>Edit your story</h2>
          <LineBreak />
          <p>Make changes to your story.</p>
          <LineBreak />
          <div className="backBtn_spacing">
            <BackButton />
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
          <p className="tags text-sm font-bold">Story Thumbnail</p>
          <LineBreak />
          <ImageDropzone file="story" urlSent={story?.thumbnailUrl || ""} />
          <>
            {isFetching ? (
              <div className="story_template_nextBtn primaryBtn">
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : (
              <div>
                {title.length > 0 && desc.length > 0 ? (
                  <div
                    onClick={handleEditStory}
                    className="primaryBtn story_template_nextBtn"
                  >
                    Continue
                  </div>
                ) : (
                  <div className="story_template_nextBtn disabledBtn">
                    Continue
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </IslandLayout>
    </PageLayout>
  );
};

export default EditStory;
