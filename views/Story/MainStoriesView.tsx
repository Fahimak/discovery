"use client";
import Buttons from "components/Buttons/Buttons";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import PageLayout from "components/PageLayout/PageLayout";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveContext } from "context/Hive/hive";
import { useProfileContext } from "context/Profile/profile";
import { useStoryContext } from "context/Story/stories";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import useHiveComponentsApi from "hooks/apiHooks/Hive/useHiveComponentsApi";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import { useEffect, useState } from "react";
import StoryTileView from "./components/StoryTileView";
import { useRouter } from "next/navigation";

const MainStoriesView = () => {
  const storyC = useStoryContext();
  const hiveC = useHiveContext();

  const child = useChildComponentsContext();

  const profile = useProfileContext();

  const hive = hiveC.hiveDetails;

  const stories = storyC.getStoriesResp;

  const hiveUuid = hiveC.hiveUuid;
  const isMember = profile.isMemberView;

  const [kebabClicked, setKebabClicked] = useState("");

  const storiesBtns = child.storyComponents;

  const router = useRouter();

  const { launchLogin } = useHiveApi();
  const { getChildComponents } = useHiveComponentsApi();
  const { getAllStories } = useStoriesApi();

  useEffect(() => {
    localStorage.getItem("isLoggedIn") !== "yes" && launchLogin();
  }, []);

  useEffect(() => {
    hive && getChildComponents("Stories");
  }, [hive, isMember]);

  useEffect(() => {
    getAllStories();
  }, [hiveUuid]);

  const handleCreate = () => {
    router.push("/story/create");
  };

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="story_home_container">
          <div className="story_home_header">
            <div>
              <h2>Visual stories</h2>
              <LineBreak />
              <p>Create captivating stories and mobile-optimized videos.</p>
            </div>
            {!!storiesBtns &&
              storiesBtns.length > 0 &&
              storiesBtns.map((button, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={handleCreate}
                    className="secondaryBtn"
                  >
                    + Create Story
                  </div>
                );
              })}
          </div>
          <div className="all_stories_templates_wrapper">
            {!!stories &&
              stories.length > 0 &&
              stories.map((story, idx) => {
                return (
                  <StoryTileView
                    key={idx}
                    kebabClicked={kebabClicked}
                    setKebabClicked={setKebabClicked}
                    story={story}
                    idx={idx}
                  />
                );
              })}
          </div>
        </div>
      </IslandLayout>
    </PageLayout>
  );
};

export default MainStoriesView;
