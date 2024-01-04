import { StoryItemModel } from "api/models/Story/story";
import LineBreak from "components/LineBreak";
import LongText from "components/LongText/LongText";
import {
  CloseBlackSmSVG,
  NoOfViewsSVG,
  CopyLinkSVG,
  DeleteStorySVG,
  HappySVG,
  NeuralSVG,
  SadSVG,
  WhatsappSVG,
  LinkedInSVG,
  TwitterSVG,
} from "components/SVG/SVG";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setKebabClicked: Dispatch<SetStateAction<string>>;
  story: StoryItemModel;
  kebabClicked: string;
}

const StoryOptions = ({ setKebabClicked, story, kebabClicked }: Props) => {
  const { ToastInfo } = useHiveConfigContext();

  const stories = useStoryContext();
  const navigate = useRouter();

  const {
    getStoryLocation,
    getStoryReactions,
    getStorySocialCount,
    getStoryViews,
    deleteStory,
    getStoryItem,
  } = useStoriesApi();

  useEffect(() => {
    getStoryViews();

    getStoryReactions();

    getStoryLocation();

    getStorySocialCount();
  }, [story]);

  const storyLocations = stories.storyLocation;
  const totalReactions = stories.reducedReactions;

  const handleDelete = () => {
    deleteStory();
    setKebabClicked("");
  };

  const storyViews = stories.storyViews;

  const socialCount = stories.storySocialCount;

  const handleEdit = () => {
    stories.setStoryUuid(story.storyUuid);
    stories.storyUuid = story.storyUuid;
    getStoryItem(story.storyUuid);
    navigate.push("/story/edit", { state: { from: "/story" } });
  };

  const handleCopy = (text: string | null, social?: string) => {
    navigator.clipboard
      .writeText(
        `${text}${
          social
            ? `?${
                social === "linkedin"
                  ? "LinkedIn"
                  : social === "whatsapp"
                  ? "Whatsapp"
                  : "Twitter"
              }`
            : ""
        }`
      )
      .then(() => {
        if (!!text) {
          ToastInfo("Copied link to clipboard");
        } else {
          ToastInfo(
            "This story isnt available at the moment, please try another one"
          );
        }
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  const [scrollUp, setScrollUp] = useState(false);

  const handleScroll = () => {
    setScrollUp(true);
  };

  const unknownCount = stories.unknownCount;

  return (
    <div
      onScroll={handleScroll}
      className={`slide-up ${
        scrollUp ? "story_info_pop_up_scroll" : "story_info_pop_up"
      }`}
    >
      <div
        onClick={() => setKebabClicked("")}
        className="story_pop_up_close pointer"
      >
        <CloseBlackSmSVG />
      </div>
      <div className="story_pop_up_views">
        <NoOfViewsSVG />
        <p>{storyViews?.count}</p>
      </div>
      <div className="story_content_actions">
        <div className="story_content_copy_link">
          <div className="flex_row_align gap_5">
            <div
              onClick={(e) => handleCopy(story.storyPublishedUrl, "linkedin")}
              className="pointer"
            >
              <LinkedInSVG />
            </div>
            <div
              onClick={(e) => handleCopy(story.storyPublishedUrl, "whatsapp")}
              className="pointer"
            >
              <WhatsappSVG />
            </div>
            <div
              onClick={(e) => handleCopy(story.storyPublishedUrl, "twitter")}
              className="pointer"
            >
              <TwitterSVG />
            </div>
            <div
              className="pointer"
              onClick={(e) => handleCopy(story.storyPublishedUrl)}
            >
              <CopyLinkSVG />
            </div>
          </div>
          <div className="pointer" onClick={handleDelete}>
            <DeleteStorySVG />
          </div>
        </div>
        <div className="w_full story_options_spacing">
          <hr></hr>
        </div>
        <p onClick={handleEdit} className="pointer">
          Edit Story
        </p>
        <div className="w_full story_options_spacing">
          <hr></hr>
        </div>
        <div className="story_reactions_wrapper">
          <div className="story_reaction_wrapper text_xs">
            <HappySVG />
            <p>{totalReactions.happy}</p>
          </div>
          <div className="story_reaction_wrapper text_xs">
            <NeuralSVG />
            <p>{totalReactions.neutral}</p>
          </div>
          <div className="story_reaction_wrapper text_xs">
            <SadSVG />
            <p>{totalReactions.sad}</p>
          </div>
        </div>
        <div className="w_full story_options_spacing">
          <hr></hr>
        </div>
        <div className="story_metrics_container">
          <h3 className="">Statistics</h3>
          <div className="story_metrics_wrapper">
            <p>Views</p>
            <p>{storyViews?.count}</p>
          </div>

          <div className="story_metrics_wrapper">
            <p>Reactions</p>
            <p>{totalReactions.total}</p>
          </div>
          <div className="story_metrics_wrapper">
            <p>Interactions</p>
            <p>{storyViews?.countInteractions}</p>
          </div>
          {!!storyLocations && storyLocations.length > 0 && (
            <div className="w_full story_options_spacing">
              <hr></hr>
            </div>
          )}
          {!!storyLocations && storyLocations.length > 0 && (
            <h3 className="">Location</h3>
          )}
          {!!storyLocations &&
            storyLocations.length > 0 &&
            storyLocations.map((location, idx) => {
              return (
                <div key={idx} className="story_metrics_wrapper">
                  <LongText
                    title={
                      !!location.location && location.location.length > 1
                        ? location.location[0].toUpperCase() +
                          location.location.slice(1).toLowerCase()
                        : "Unknown"
                    }
                    cutoff={18}
                  />

                  <p>{location.locationCount}</p>
                </div>
              );
            })}
          {!!socialCount && socialCount.length > 0 && (
            <div className="w_full story_options_spacing">
              <hr></hr>
            </div>
          )}
          {!!socialCount && socialCount.length > 0 && (
            <h3 className="">Origin</h3>
          )}
          {!!socialCount &&
            socialCount.length > 0 &&
            socialCount.map((data, idx) => {
              if (data.origin !== "unknown") {
                return (
                  <div key={idx} className="story_metrics_wrapper">
                    <p>{data.origin}</p>
                    <p>{data.originCount}</p>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="story_metrics_wrapper">
                    <p>Unknown</p>
                    <p>{unknownCount}</p>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default StoryOptions;
