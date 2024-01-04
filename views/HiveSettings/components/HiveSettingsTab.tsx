"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/navigation";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";

const HiveTabs = () => {
  const hiveSettings = useHiveSettingsContext();

  const tabsList = hiveSettings.tabsList;
  const selectedHiveTab = hiveSettings.tabsIdx;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    hiveSettings.setTabsIdx(newValue);
    // router.push(`${tabsList[newValue].toLowerCase()}`);
  };

  return (
    // <div className="tabs_container">
    <Tabs
      value={selectedHiveTab}
      onChange={handleChange}
      aria-label="hive tabs"
      className="tabs-wrapper"
    >
      {tabsList.map((tab, idx) => {
        return (
          <Tab
            style={{
              width: "33.3333%",
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
            key={idx}
            label={tab}
          />
        );
      })}
    </Tabs>
    // </div>
  );
};

export default HiveTabs;
