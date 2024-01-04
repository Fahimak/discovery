"use client";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const StoryStart = ({ params }: { params: { uuid: string } }) => {
  const urlParams = params.uuid;

  const stories = useStoryContext();

  const navigate = useRouter();

  const storyItem = stories.storyItem;

  const backgroundImage = storyItem?.thumbnailUrl
    ? `url(${storyItem.thumbnailUrl})`
    : "none";

  const handleClick = () => {
    navigate.push(`/story/view/${urlParams}`);
    stories.setStartClicked(true);
  };

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.open(`${process.env.REACT_APP_STORIES_URL}${urlParams}`, "_self");
    }
  }, [navigator.userAgent]);

  const { getStoryItem, getStoryDetails } = useStoriesApi();

  console.log(urlParams);

  useEffect(() => {
    if (urlParams) {
      stories.setViewingStoryUuid(urlParams);
      stories.viewingStoryUuid = urlParams;
      stories.storyUuid = urlParams;
      stories.setStoryUuid(urlParams);
      getStoryDetails();
      getStoryItem(urlParams);
    }
  }, [urlParams]);

  return (
    <div className="home_wrap">
      <div
        className="black-screen"
        style={{
          backgroundImage,
          backgroundColor: storyItem?.colorCode,
        }}
      >
        <button onClick={handleClick} className="start-button">
          Start
        </button>
      </div>
    </div>
  );
};

export default StoryStart;
