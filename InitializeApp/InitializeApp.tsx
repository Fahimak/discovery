"use client";

import QueryParams from "components/QueryParams/QueryParams";
import { useHiveContext } from "context/Hive/hive";
import { useProfileContext } from "context/Profile/profile";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import useHiveComponentsApi from "hooks/apiHooks/Hive/useHiveComponentsApi";
import { useEffect } from "react";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ae from "javascript-time-ago/locale/en-GB.json";
import { usePathname } from "next/navigation";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ae);

const InitializeApp = () => {
  const { getHiveDetails, getChannelList } = useHiveApi();

  const { getHiveComponents } = useHiveComponentsApi();

  const profileState = useProfileContext();
  const hiveState = useHiveContext();

  useEffect(() => {
    let subDomain = document.location.hostname.split(".")[0];
    if (subDomain === "localhost") {
      subDomain = "vee";
    }

    localStorage.setItem("subDomain", "vee");
    // localStorage.setItem("subDomain", subDomain!);
  }, []);

  useEffect(() => {
    getHiveDetails();

    if (localStorage.getItem("isLoggedIn") === "yes") {
      getHiveComponents({
        organizationId: hiveState.hiveDetails?.communityId || 2,
        isMemberView: profileState.isMemberView,
      });
    } else {
      getHiveComponents({
        communityDomain: localStorage.getItem("subDomain"),
        isMemberView: profileState.isMemberView,
      });
    }
  }, [profileState.profileDetails]);

  return (
    <>
      <QueryParams />
    </>
  );
};

export default InitializeApp;
