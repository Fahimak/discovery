"use client";
import { CircularProgress } from "@mui/material";
// import FeedItem from "components/FeedItem";
import IslandLayout from "components/IslandLayout";
import PageLayout from "components/PageLayout/PageLayout";
import { useFeedContext } from "context/Feed/feed";
// import ComingSoon from "pages/ComingSoon";
import React, { useEffect, useState } from "react";
import { useFeedPageContext } from "./useFeedContext";
import FeedItem from "components/FeedItem";

const FeedPage = () => {
  const {
    reachedBottom,
    setReachedBottom,
    apiCallInProgress,
    setApiCallInProgress,
    hive,
    handleScroll,
    feed,
    scrollAncholRef,
    pageNo,
  } = useFeedPageContext();

  return (
    <>
      {feed.feedVids ? (
        <PageLayout sideMenu={true}>
          <IslandLayout>
            {hive.hiveDetails &&
              feed.feedVids &&
              feed.feedVids.length > 0 &&
              feed.feedVids?.map((data, index) => {
                return (
                  <div key={index}>
                    <FeedItem feedItem={data} />
                    {index < feed.feedVids.length - 1 && (
                      <hr className="padding"></hr>
                    )}

                    <span
                      ref={scrollAncholRef}
                      style={{
                        width: "100%",
                        minHeight: "1px",
                        marginBottom: "-1px",
                        opacity: 0,
                      }}
                    />
                  </div>
                );
              })}
            {/* {feedVideos.length && totalPages > feedVideos.length && ( */}
            <div className="load_more_container">
              {feed.isLoading === true && (
                // (feedVideos.length && totalPages > feedVideos.length &&
                <CircularProgress size={20} color="inherit" />
                // )
              )}
            </div>
            {/* )} */}
          </IslandLayout>
        </PageLayout>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default FeedPage;
