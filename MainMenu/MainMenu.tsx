"use client";
import ChannelItem from "./components/ChannelItem";
import MenuItem from "./components/MenuItem";
import React, { useState, useEffect } from "react";
import LineBreak from "components/LineBreak";
import IslandLayout from "components/IslandLayout";
import { useHiveComponentsContext } from "context/Hive/hiveComponents";
import { useHiveContext } from "context/Hive/hive";

const MainMenu = () => {
  const hiveComponents = useHiveComponentsContext();
  const hiveState = useHiveContext();

  return (
    <div className="main_menu_container">
      {hiveComponents.userMenuItems &&
        hiveComponents.userMenuItems.length > 0 && (
          <IslandLayout>
            <div className="user_menu">
              {hiveComponents.userMenuItems.map((menuItem) => {
                return (
                  <MenuItem key={menuItem.componentCode} menuItem={menuItem} />
                );
              })}
            </div>
          </IslandLayout>
        )}
      {hiveComponents.adminMenuItems &&
        hiveComponents.adminMenuItems.length > 0 && (
          <IslandLayout>
            <div className="admin_menu">
              {hiveComponents.adminMenuItems.map((adminItem) => {
                return (
                  <MenuItem
                    key={adminItem.componentCode}
                    menuItem={adminItem}
                  />
                );
              })}
            </div>
          </IslandLayout>
        )}
      {hiveState.channelList && hiveState.channelList.length > 0 && (
        <IslandLayout>
          <div className="channels_menu">
            <h2 className="channel_heading">Channels</h2>
            {hiveState.channelList.map((channelItem) => {
              return (
                <ChannelItem
                  key={channelItem.channelUuid}
                  channelItem={channelItem}
                />
              );
            })}
          </div>
        </IslandLayout>
      )}
      {/* {hiveDetails && hiveDetails.showSuggested && (
        <IslandLayout>
          <PublicHives />
        </IslandLayout>
      )}
      <IslandLayout>
        <Footer />
      </IslandLayout> */}
    </div>
  );
};

export default MainMenu;
