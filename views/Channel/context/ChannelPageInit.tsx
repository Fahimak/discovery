"use client";
import { useChannelContext } from "context/Channel/channel";
import { useHiveContext } from "context/Hive/hive";
import { useVideoContext } from "context/Videos/videos";
import useChannelApi from "hooks/apiHooks/Channel/useChannelApi";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import useHiveComponentsApi from "hooks/apiHooks/Hive/useHiveComponentsApi";
import { useEffect } from "react";

interface Props {
  channelUuid: string;
}

const ChannelPageInit = ({ channelUuid }: Props) => {
  const hive = useHiveContext();
  const channel = useChannelContext();
  const video = useVideoContext();

  const hiveDetails = hive.hiveDetails;

  const { getHiveActivities, getHiveDetails } = useHiveApi();
  const { getChannelDetails } = useChannelApi();
  const { getChildComponents } = useHiveComponentsApi();

  useEffect(() => {
    video.setPageNo(0);
    !!channelUuid && hiveDetails && getHiveActivities(6);
  }, [hiveDetails, channelUuid]);

  useEffect(() => {
    localStorage.setItem("path", "");
    if (!!channelUuid && hive.hiveDetails) {
      getHiveDetails();
      channel.setActiveChannel(channelUuid);
      localStorage.setItem("path", location.pathname);
      getChannelDetails(channelUuid);
      getChildComponents("CHANNEL", channelUuid);
    }
    // if (!!!channelUuid) navigate("/home");
  }, [channelUuid, hive.hiveUuid]);

  return <></>;
};

export default ChannelPageInit;
