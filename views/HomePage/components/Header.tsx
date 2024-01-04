"use client";

import Buttons from "components/Buttons";
import {
  VideoStatsSVG,
  UsersStatsSVG,
  ChannelStatsSVG,
  StoriesStatsSVG,
  OnlineStatsSVG,
} from "components/SVG/SVG";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveContext } from "context/Hive/hive";
import { useHiveComponentsContext } from "context/Hive/hiveComponents";
import { useGlobalContext } from "context/config";
import useHiveComponentsApi from "hooks/apiHooks/Hive/useHiveComponentsApi";
import { useEffect } from "react";

const Header = () => {
  const hiveState = useHiveContext();
  const componentState = useHiveComponentsContext();
  const globalState = useGlobalContext();
  const children = useChildComponentsContext();

  const { getChildComponents } = useHiveComponentsApi();

  useEffect(() => {
    hiveState.hiveDetails?.communityId && getChildComponents("Home");
  }, [hiveState.hiveDetails]);

  return (
    <>
      <div className="home_media_container">
        <img
          alt=""
          className="home_banner"
          src={hiveState.hiveDetails?.communityBanner}
        />
        <img
          alt=""
          className="home_logo"
          src={hiveState.hiveDetails?.communityWebLogo || ""}
        />
      </div>
      <div className="home_page_content">
        <h1 className="home_page_heading">
          {hiveState.hiveDetails?.communityName}
        </h1>
        <div className="home_details_wrapper">
          <div className="home_insights">
            {/* <p> */}
            <div className="stat_gapping">
              <VideoStatsSVG />
              {12}
            </div>
            {/* • */}
            <div className="stat_gapping">
              <UsersStatsSVG />
              {200}
            </div>
            {/* • */}
            <div className="stat_gapping">
              <ChannelStatsSVG />
              {10}
            </div>
            {/* • */}
            <div className="stat_gapping">
              <StoriesStatsSVG />
              {5}
            </div>
            {/* • */}
            <div className="stat_gapping">
              <OnlineStatsSVG />
              {2}
            </div>
            {/* </p> */}
          </div>
          <div className="home_buttons">
            {children.childComponents.map((button, idx) => {
              return (
                <Buttons key={idx} button={button}>
                  {button.componentType === "logo" ? (
                    <img src={button.componentIcon} alt="" width="20px" />
                  ) : (
                    button.componentName
                  )}
                </Buttons>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
