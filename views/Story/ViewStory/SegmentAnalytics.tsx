"use client";
import { CircularProgress } from "@mui/material";
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
  NoOfViewsWhiteSVG,
} from "components/SVG/SVG";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SegmentAnalytics = () => {
  const stories = useStoryContext();

  const storyUuid = stories.viewingStoryUuid;
  const navigate = useRouter();

  const {
    getStoryLocation,
    getStoryReactions,
    getStorySocialCount,
    getStoryViews,
  } = useStoriesApi();

  useEffect(() => {
    getStoryViews();

    getStoryReactions();

    getStoryLocation();

    getStorySocialCount();
  }, [storyUuid]);

  const storyLocations = stories.storyLocation;
  const totalReactions = stories.reducedReactions;
  const storyViews = stories.storyViews;

  const socialCount = stories.storySocialCount;

  const [scrollUp, setScrollUp] = useState(false);

  const handleScroll = () => {
    setScrollUp(true);
  };

  const isLoading = stories.isFetching;

  const unknownCount = stories.unknownCount;

  return (
    <div onScroll={handleScroll} className={`segment_analytics_wrapper`}>
      <div className="story_content_actions white_text">
        <div className="story_content_copy_link">
          <div className="no_of_views_wrapper">
            <NoOfViewsWhiteSVG />
            <p>{storyViews?.count}</p>
          </div>
        </div>
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
            <p>
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                storyViews?.count
              )}
            </p>
          </div>
          <div className="story_metrics_wrapper">
            <p>Reactions</p>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              totalReactions.total
            )}{" "}
          </div>
          <div className="story_metrics_wrapper">
            <p>Interactions</p>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              storyViews?.countInteractions
            )}{" "}
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
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    location.locationCount
                  )}{" "}
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

export default SegmentAnalytics;
