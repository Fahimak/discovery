import { CircularProgress } from "@mui/material";
import IslandLayout from "components/IslandLayout";
import PageNumbers from "components/PageNumbers";
import VideoItem from "components/VideoItem";
import VideoTabs from "components/VideoTabs/VideoTabs";
import { useChannelContext } from "context/Channel/channel";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useVideoContext } from "context/Videos/videos";
import useVideoListApi from "hooks/apiHooks/Videos/useVideoListApi";
import { useEffect } from "react";

const ChannelVideos = () => {
  const video = useVideoContext();
  const child = useChildComponentsContext();
  const channel = useChannelContext();

  const videoList = video.videoList;
  const totalVideos = video.videoList?.noOfElements;
  const isFetching = video.isLoading;

  const { getVideoList } = useVideoListApi();

  useEffect(() => {
    //  dispatch(setS3Done(false));
    //  dispatch(setContentUploadResp(undefined));
    getVideoList(video.activeTab);
  }, [video.activeTab, channel.activeChannelUuid, video.pageNo]);

  const handleChange = (passedPageNo: number) => {
    const oldPage = video.pageNo;
    video.pageNo = passedPageNo;
    video.setPageNo(passedPageNo);
    oldPage !== video.pageNo &&
      !!child.videoTabs &&
      child.videoTabs.length > 0 &&
      child.videoTabs[video.activeTab] &&
      child.videoTabs[video.activeTab].componentName &&
      getVideoList(video.activeTab);
  };

  return (
    <IslandLayout>
      <div className="channel_content">
        <VideoTabs />
        {isFetching ? (
          <div className="p-3">
            <CircularProgress size={30} color="inherit" />
          </div>
        ) : (
          <>
            {!!videoList &&
            !!videoList.videoList &&
            videoList.videoList.length > 0 ? (
              <>
                <div className="title_and_limit video_content_header">
                  <h3>
                    {totalVideos || 0} {totalVideos === 1 ? "Video" : "Videos"}
                  </h3>
                  {/* <SortVideo /> */}
                </div>
                <div className="channel_videos">
                  {videoList.videoList.map((video, idx) => {
                    return <VideoItem key={idx} idx={idx} videoItem={video} />;
                  })}
                  {videoList.totalPages && videoList?.totalPages > 1 && (
                    <div className="pagination_container">
                      <PageNumbers
                        totalPages={videoList?.totalPages || 0}
                        initialPage={video.pageNo}
                        handleChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no_videos_container">
                {child.videoTabs.length > 0 && (
                  <>
                    <h3>{"No Videos found"}</h3>
                    <p className="">
                      {
                        "Here is where you will find all the videos that have been"
                      }{" "}
                      {child.videoTabs[video.activeTab].componentName ===
                      "Videos"
                        ? `approved`
                        : child.videoTabs[
                            video.activeTab
                          ].componentName.toLowerCase()}
                      {". Take a look and make sure everything is in order."}
                    </p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </IslandLayout>
  );
};

export default ChannelVideos;
