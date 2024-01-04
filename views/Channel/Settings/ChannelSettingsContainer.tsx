"use client";

import { useChannelContext } from "context/Channel/channel";
import ChannelAbout from "./ChannelAbout";
import EditChannelSettings from "./ChannelSettings";
import MembersList from "./ChannelMembers";
import BackButton from "components/BackButton";
import ChannelTabs from "components/ChannelTabs";
import IslandLayout from "components/IslandLayout";
import PageLayout from "components/PageLayout/PageLayout";

const ChannelSettingsContainer = () => {
  const channel = useChannelContext();

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="ce_settings_container">
          <BackButton />
          <ChannelTabs />
          {channel.activeTab === 0 ? (
            <ChannelAbout />
          ) : channel.activeTab === 1 ? (
            <MembersList />
          ) : channel.activeTab === 2 ? (
            <EditChannelSettings />
          ) : (
            <></>
          )}
        </div>
      </IslandLayout>
    </PageLayout>
  );
};

export default ChannelSettingsContainer;
