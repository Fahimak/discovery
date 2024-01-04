"use client";
import { FeedContextProps, useFeedContext } from "context/Feed/feed";
import { HiveContextProps, useHiveContext } from "context/Hive/hive";
import useFeedApi from "hooks/apiHooks/Feed/useFeedApi";
import { useScrollPagination } from "hooks/useScrollPagination";
import { useEffect, useState } from "react";

interface UseFeedPageReturn {
  reachedBottom: boolean;
  setReachedBottom: any;
  apiCallInProgress: boolean;
  setApiCallInProgress: any;
  hive: HiveContextProps;
  handleScroll: any;
  feed: FeedContextProps;
  scrollAncholRef: any;
  pageNo: number;
}

export const useFeedPageContext = (): UseFeedPageReturn => {
  const hive = useHiveContext();
  const feed = useFeedContext();

  const [reachedBottom, setReachedBottom] = useState(false);
  const [apiCallInProgress, setApiCallInProgress] = useState(false);

  const hiveDetails = hive.hiveDetails;

  const { getFeedVideos } = useFeedApi();

  const handleScroll = () => {
    if (reachedBottom || apiCallInProgress) {
      return;
    } else {
      setReachedBottom(true);
      setPageNo((prevState) => prevState + 1);
      setTimeout(() => {
        setReachedBottom(false);
      }, 3000);
    }
  };
  const scrollAncholRef = useScrollPagination(
    handleScroll,
    !!feed.feedVids.length
  );

  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    localStorage.setItem("path", "/feed");

    if (apiCallInProgress) {
      return;
    }
    setApiCallInProgress(true);
    getFeedVideos(pageNo).then(() => {
      setApiCallInProgress(false);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiveDetails, pageNo]);

  return {
    reachedBottom,
    setReachedBottom,
    apiCallInProgress,
    setApiCallInProgress,
    hive,
    handleScroll,
    feed,
    scrollAncholRef,
    pageNo,
  };
};
