import { StoryItemModel } from "api/models/Story/story";
import LongText from "components/LongText/LongText";
import { StoryKebabSVG } from "components/SVG/SVG";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useStoryContext } from "context/Story/stories";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import StoryOptions from "./StoryOptions";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";

interface Props {
  story: StoryItemModel;
  idx: number;
  setKebabClicked: Dispatch<SetStateAction<string>>;
  kebabClicked: string;
}

const StoryTileView = ({
  story,
  idx,
  kebabClicked,
  setKebabClicked,
}: Props) => {
  const child = useChildComponentsContext();

  const storiesChild = child.storyComponents;

  const stories = useStoryContext();

  const handleKebab = () => {
    stories.setStoryUuid(story.storyUuid);
    setKebabClicked(story.storyUuid);
  };

  const navigate = useRouter();

  const { ToastInfo } = useHiveConfigContext();

  const handleStoryClick = () => {
    stories.setViewingStoryUuid(story.storyUuid);
    navigate.push(`/story/view/start/${story.storyUuid}`);
    if (story.storyPublishedUrl) {
      // window.open(story.storyPublishedUrl, "_blank");
    } else {
      ToastInfo(
        "This story isnt available at the moment, please try another one"
      );
    }
  };

  const { getStoryItem } = useStoriesApi();

  const handleSetStory = () => {
    stories.setStoryUuid(story.storyUuid);
    getStoryItem(story.storyUuid);
  };

  return (
    <div onClick={handleSetStory} className="story_template">
      <div
        onClick={handleStoryClick}
        style={{ backgroundColor: story.colorCode || "" }}
        className="story_template_display_wrapper pointer"
      >
        {story.thumbnailUrl && (
          <img
            src={story.thumbnailUrl || ""}
            alt=""
            className="ai_template_img story_template_img"
          />
        )}
      </div>
      <div className="story_template_content_wrapper">
        <p className="text-sm font-bold story_template_description">
          <LongText title={story.storyTitle} cutoff={16} />
        </p>
        {!!storiesChild &&
          storiesChild[0] &&
          !!storiesChild[0].componentName && (
            <div className="pointer" onClick={handleKebab}>
              <StoryKebabSVG />
            </div>
          )}
      </div>
      {kebabClicked === story.storyUuid && (
        <StoryOptions
          kebabClicked={kebabClicked}
          story={story}
          setKebabClicked={setKebabClicked}
        />
      )}
    </div>
  );
};

export default StoryTileView;
