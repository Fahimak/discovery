"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useChannelContext } from "context/Channel/channel";

const ChannelTabs = () => {
  const channel = useChannelContext();
  const tabs = channel.channelTabs;
  const selectedTab = channel.activeTab;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    channel.setActiveTab(newValue);
  };

  return (
    <Tabs value={selectedTab} onChange={handleChange} aria-label="channel tabs">
      {tabs.map((tab, idx) => {
        return (
          <Tab
            key={idx}
            style={{
              width: "33%",
              height: "20px",
              fontFamily: "IBM Plex Sans Condensed",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "140%",
              textAlign: "center",
              letterSpacing: "0.02em",
              color: "#1C1B1F",
            }}
            label={tab}
          />
        );
      })}
    </Tabs>
  );
};

export default ChannelTabs;
