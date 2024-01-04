"use client";
import BackButton from "components/BackButton/BackButton";
import HiveTabs from "./components/HiveSettingsTab";
import LineBreak from "components/LineBreak/LineBreak";
import { useHiveSettingsContext } from "context/Hive/hiveSettings";
import HiveAbout from "./components/HiveAbout";
import HiveMedia from "./components/HiveMedia";
import MembersList from "./components/MembersList";

const HiveSettingsPage = () => {
  const hiveSettings = useHiveSettingsContext();

  return (
    <div className="ce_about_wrapper">
      <BackButton />
      <HiveTabs />
      {hiveSettings.tabsIdx === 0 ? (
        <HiveAbout />
      ) : hiveSettings.tabsIdx === 1 ? (
        <HiveMedia />
      ) : hiveSettings.tabsIdx === 2 ? (
        <MembersList />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HiveSettingsPage;
