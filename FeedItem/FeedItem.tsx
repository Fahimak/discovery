import { FeedItem } from "api/models/Feed/feed";
import LineBreak from "components/LineBreak";
import ProfilePhoto from "components/ProfilePhoto";
import { defaultAvatar } from "constants/constants";
import React from "react";
import ReactPlayer from "react-player";

interface Props {
  feedItem: FeedItem;
}

const FeedVideoItem = ({ feedItem }: Props) => {
  return (
    <div className="feed_item">
      <div className="feed_head">
        <ProfilePhoto
          imgUrl={
            feedItem.profilePhoto !== "None"
              ? feedItem.profilePhoto
              : defaultAvatar
          }
        />
        <div>
          <h4>{feedItem.name}</h4>
          <LineBreak />
          <div className="flex flex-wrap gap-x-1">
            {!!feedItem.tags &&
              feedItem.tags.map((tag, idx) => {
                return (
                  <p className="tags" key={idx}>
                    #{tag}
                  </p>
                );
              })}
          </div>
          <LineBreak />
          <p className="tags text-sm">Posted by {feedItem.userName}</p>
        </div>
      </div>
      <div className="feed_body_container">
        <div className="feed_body">
          {/* {localStorage.getItem("isLoggedIn") === "yes" ? ( */}
          <ReactPlayer
            url={feedItem.sourceUrl}
            // ref={videoRef}
            // playing={isPlaying}
            controls
            width="300px"
            height="533px"
            style={{
              overflow: "hidden",
              borderRadius: "15px",
              background: "black",
            }}
          />
          {/* ) : (
            <img
              onClick={launchLogin}
              src={feedItem.previewImage}
              alt=""
              className="feed_video"
            />
          )} */}
        </div>
        <div className="feed_item_icons">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="47"
              height="47"
              rx="23.5"
              fill="#FAFAFA"
            />
            <path
              d="M23.9974 24.3333V19.3333M21.4974 21.8333H26.4974M29.8307 31V20C29.8307 18.5999 29.8307 17.8998 29.5582 17.365C29.3186 16.8946 28.9361 16.5122 28.4657 16.2725C27.9309 16 27.2309 16 25.8307 16H22.1641C20.7639 16 20.0639 16 19.5291 16.2725C19.0587 16.5122 18.6762 16.8946 18.4365 17.365C18.1641 17.8998 18.1641 18.5999 18.1641 20V31L23.9974 27.6667L29.8307 31Z"
              stroke="#5A5A5A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="0.5"
              y="0.5"
              width="47"
              height="47"
              rx="23.5"
              stroke="#CCCCCC"
            />
          </svg>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="47"
              height="47"
              rx="23.5"
              fill="#FAFAFA"
            />
            <path
              d="M20.25 22.25H20.2583M24 22.25H24.0083M27.75 22.25H27.7583M22.25 29.5L23.4667 31.1222C23.6476 31.3635 23.7381 31.4841 23.849 31.5272C23.9461 31.565 24.0539 31.565 24.151 31.5272C24.2619 31.4841 24.3524 31.3635 24.5333 31.1222L25.75 29.5C25.9943 29.1743 26.1164 29.0114 26.2654 28.8871C26.4641 28.7213 26.6986 28.604 26.9504 28.5446C27.1393 28.5 27.3429 28.5 27.75 28.5C28.9149 28.5 29.4973 28.5 29.9567 28.3097C30.5693 28.056 31.056 27.5693 31.3097 26.9567C31.5 26.4973 31.5 25.9149 31.5 24.75V20C31.5 18.5999 31.5 17.8998 31.2275 17.365C30.9878 16.8946 30.6054 16.5122 30.135 16.2725C29.6002 16 28.9001 16 27.5 16H20.5C19.0999 16 18.3998 16 17.865 16.2725C17.3946 16.5122 17.0122 16.8946 16.7725 17.365C16.5 17.8998 16.5 18.5999 16.5 20V24.75C16.5 25.9149 16.5 26.4973 16.6903 26.9567C16.944 27.5693 17.4307 28.056 18.0433 28.3097C18.5027 28.5 19.0851 28.5 20.25 28.5C20.6571 28.5 20.8607 28.5 21.0496 28.5446C21.3014 28.604 21.5359 28.7213 21.7346 28.8871C21.8836 29.0114 22.0057 29.1743 22.25 29.5ZM20.6667 22.25C20.6667 22.4801 20.4801 22.6667 20.25 22.6667C20.0199 22.6667 19.8333 22.4801 19.8333 22.25C19.8333 22.0199 20.0199 21.8333 20.25 21.8333C20.4801 21.8333 20.6667 22.0199 20.6667 22.25ZM24.4167 22.25C24.4167 22.4801 24.2301 22.6667 24 22.6667C23.7699 22.6667 23.5833 22.4801 23.5833 22.25C23.5833 22.0199 23.7699 21.8333 24 21.8333C24.2301 21.8333 24.4167 22.0199 24.4167 22.25ZM28.1667 22.25C28.1667 22.4801 27.9801 22.6667 27.75 22.6667C27.5199 22.6667 27.3333 22.4801 27.3333 22.25C27.3333 22.0199 27.5199 21.8333 27.75 21.8333C27.9801 21.8333 28.1667 22.0199 28.1667 22.25Z"
              stroke="#5A5A5A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="0.5"
              y="0.5"
              width="47"
              height="47"
              rx="23.5"
              stroke="#CCCCCC"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeedVideoItem;
