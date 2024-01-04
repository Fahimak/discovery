"use client";
import { getFeedApi } from "api/actions/Feed/feed";
import { useFeedContext } from "context/Feed/feed";
import { useHiveContext } from "context/Hive/hive";

export const useFeedApi = () => {
  const feed = useFeedContext();
  const hive = useHiveContext();

  const getFeedVideos = async (passedPageNo: number) => {
    feed.setIsLoading(true);
    try {
      const data = await getFeedApi({
        communityUuid: hive.hiveUuid,
        contentLimit: 15,
        pageNo: passedPageNo,
      });

      if (data.responseInfo.httpCode === 200) {
        feed.setFeedVidsResp(data.data);
        data.data.forEach((video) => {
          if (
            !feed.feedVids.some(
              (existingVideo) => existingVideo.videoUuid === video.videoUuid
            )
          ) {
            feed.feedVids.push(video);
          }
        });
      } else {
      }
    } catch {}
    feed.setIsLoading(false);
  };

  return {
    getFeedVideos,
  };
};

export default useFeedApi;
