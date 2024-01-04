"use client";
import React, { useEffect } from "react";
import Stories from "react-insta-stories";
import { useState } from "react";
import clientApi from "api";
import { MuteSVG, UnMuteSVG } from "components/SVG/SVG";
import { useStoryContext } from "context/Story/stories";
import { useRouter } from "next/navigation";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";

const StoryView = ({ params }: { params: { uuid: string } }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStory, setCurrentStory] = useState({
    selectedEmoji: "default",
    storyItemId: 0,
    storyUuid: "",
    url: "",
    title: "",
    description: "",
    type: "",
    actionLink: "",
    colorCode: "",
    longDescriptionList: [],
    textColorCode: "",
  });

  const emojis = [
    {
      reactionEmoji: "https://images.veehive.ai/emojis/love_emoji.png",
      reactionType: "love",
      reactionId: 3,
    },
    {
      reactionEmoji: "https://images.veehive.ai/emojis/meh_emoji.png",
      reactionType: "meh",
      reactionId: 2,
    },
    {
      reactionEmoji: "https://images.veehive.ai/emojis/nah_emoji.png",
      reactionType: "nah",
      reactionId: 1,
    },
  ];

  const stories = useStoryContext();
  const [showSelections, setShowSelections] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [firstStoryLoaded, setFirstStoryLoaded] = useState(false);

  const segmentItemReactions = stories.segmentItemReact;

  const getSelectedEmojiSrc = () => {
    const emoji =
      segmentItemReactions &&
      emojis.find(
        (emojiObj) => emojiObj.reactionId === +segmentItemReactions?.reactionId
      );
    return emoji
      ? emoji.reactionEmoji
      : "https://images.veehive.ai/emojis/defaultEmoji.png";
  };

  const storyListReduced = stories.reducedStoryList;
  const [selectedEmoji, setSelectedEmoji] = useState(
    currentStory?.selectedEmoji
  );
  const storyUuid = params.uuid;

  const startClicked = stories.startClicked;
  const storyItem = stories.storyItem;

  const navigate = useRouter();

  const {
    getStorySegmentReact,
    getSegmentLocation,
    getSegmentReactions,
    getSegmentViews,
    updateStoryReaction,
    getStoryDetails,
  } = useStoriesApi();

  const handleStoryStart = (s: any, st: any) => {
    if (s === 0 && !firstStoryLoaded) {
      setIsPaused(false);
    }
    setCurrentStoryIndex(st);
    setCurrentStory(st);

    getStorySegmentReact(st.storyItemId);

    stories.setCurrentStoryItem(st);
    getSegmentViews(st.storyItemId);

    getSegmentLocation(st.storyItemId);

    getSegmentReactions(st.storyItemId);
  };

  useEffect(() => {
    !startClicked &&
      storyUuid &&
      navigate.push(`/story/view/start/${storyUuid}`);
  }, []);

  useEffect(() => {
    if (storyUuid) {
      stories.setViewingStoryUuid(storyUuid);
      window.dispatchEvent(
        new CustomEvent("analyticsEvent", {
          detail: {
            ctaName: "storyInit",
            pageName: location.pathname.slice(1),
            storyUuid: storyUuid,
            // organizationUuid: hiveDetails.communityUuid,
          },
        })
      );
    }
  }, [storyUuid]);

  const setEmoji = (e: any) => {
    setCurrentStory((prevState) => ({
      ...prevState,
      selectedEmoji: e.reactionType,
    }));
    updateStoryReaction(currentStory.storyItemId, e.reactionId, e.reactionType);
    setSelectedEmoji(e.reactionType);
    setShowSelections(false);
  };

  useEffect(() => {
    if (storyUuid) {
      stories.setViewingStoryUuid(storyUuid);
      getStoryDetails();
    }
  }, [storyUuid]);

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = (passedBool?: boolean) => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      video.muted = passedBool || !isMuted;
    });

    setIsMuted(passedBool || !isMuted);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleActionClick = () => {
    window.dispatchEvent(
      new CustomEvent("analyticsEvent", {
        detail: {
          ctaName: "actionLinkClick",
          pageName: location.pathname.slice(1),
          storyUuid: storyUuid,
        },
      })
    );
  };

  return (
    <div className="stories_container">
      <div className="full_wrap">
        {currentStory.type === "video" && (
          <div onClick={() => toggleMute()} className="mute_button">
            {isMuted ? <MuteSVG /> : <UnMuteSVG />}
          </div>
        )}
        <div
          style={{
            backgroundColor: currentStory.colorCode,
          }}
          className="stories_wrapper"
        >
          {storyListReduced && storyListReduced.length > 0 && (
            <Stories
              storyStyles={{
                backgroundColor: currentStory.colorCode,
                objectFit: "cover",
                width: "720px",
                // height: currentStory.type === "image" ? "100vh" : "",
              }}
              loop
              keyboardNavigation
              defaultInterval={8000}
              stories={storyListReduced}
              width="100%"
              height="100%"
              isPaused={isPaused}
              onAllStoriesEnd={(s: any, st: any) =>
                console.log("all stories ended", s, st)
              }
              onStoryStart={handleStoryStart}
            />
          )}
          <div onClick={handlePause} className="pause_element"></div>
          {/* {!!currentStory.longDescriptionList &&
            currentStory.longDescriptionList[0] && (
              <div className="story_long_desc_wrapper">
                {currentStory.longDescriptionList.map((data, idx) => {
                  return (
                    <ul
                      style={{ color: "#fff" }}
                      // style={{ color: currentStory.textColorCode }}
                      className="long_desc_data"
                    >
                      <p>•</p>
                      <p>{data}</p>
                    </ul>
                  );
                })}
              </div>
            )} */}
          <div className="full_z stories_bottom_container">
            <div className="stories_desc_section">
              <div className="stories_title">{currentStory?.title}</div>
              <div className="stories_desc">{currentStory?.description}</div>
            </div>
            <div className="full_z emoji_container_items">
              <div>
                {showSelections && (
                  <div className="emojis_wrapper">
                    {emojis.map((emojiObj) => (
                      <img
                        key={emojiObj.reactionId}
                        onClick={() => setEmoji(emojiObj)}
                        src={emojiObj.reactionEmoji}
                        className="emoji"
                        alt={emojiObj.reactionType}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div
                className="full_z"
                onClick={() => setShowSelections((prevState) => !prevState)}
              >
                <img
                  src={getSelectedEmojiSrc()}
                  className={
                    currentStory.selectedEmoji ? "emoji" : "default_emoji"
                  }
                  alt="selected emoji"
                />
              </div>
            </div>
          </div>
          {currentStory?.actionLink && currentStory.actionLink !== "" && (
            <a
              onClick={handleActionClick}
              href={currentStory.actionLink}
              target="_self"
              rel="noopener noreferrer"
              className="secondaryBtn show_moreBtn full_zz"
            >
              Click here
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryView;
