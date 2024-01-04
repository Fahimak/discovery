import { VideoListItem } from "api/models/Videos/videoList";
import VideoKebab from "components/VideoKebab/VideoKebab";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useVideoContext } from "context/Videos/videos";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  idx: number;
  videoItem: VideoListItem;
}

const VideoItem = ({ idx, videoItem }: Props) => {
  const navigate = useRouter();

  const child = useChildComponentsContext();
  const video = useVideoContext();

  const videoTabs = child.videoTabs;

  const path = usePathname();

  const { launchLogin } = useHiveApi();

  const handleClick = () => {
    console.log(videoItem.route);
    // video.setCurrentVideo(videoItem);
    video.setCurrentVideoIdx(idx);
    if (localStorage.getItem("isLoggedIn") === "yes") {
      navigate.push(path + "/" + videoItem.route.replace("videos/", ""));
    } else {
      launchLogin();
    }
  };

  return (
    <div className="video_item_container relative">
      <img
        alt=""
        className="video_card"
        onClick={handleClick}
        src={
          videoItem.thumbnail ||
          "https://veehivestage-images.s3.us-east-2.amazonaws.com/channelImages/defaultChannelLogo.jpg"
        }
      />
      <p className="video_title black_text">
        {!!videoItem &&
        !!videoItem.videoTitle &&
        videoItem.videoTitle.length > 14
          ? videoItem.videoTitle!.slice(0, 14) + "..."
          : videoItem.videoTitle}
      </p>
      {videoTabs && videoTabs.length > 1 && (
        <div className="video_kebab_container">
          <VideoKebab currentVideo={videoItem} />
        </div>
      )}
    </div>
  );
};

export default VideoItem;
