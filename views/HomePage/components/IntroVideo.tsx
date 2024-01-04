"use client";
import IslandLayout from "components/IslandLayout";
import { useHiveContext } from "context/Hive/hive";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

const IntroVideo = () => {
  const hive = useHiveContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);

  const openURL = () => {
    if (videoRef.current) {
      setShowControls(true);
      setShowBuyButton(false);
    }
  };

  const handleVideoStart = () => {
    setTimeout(() => {
      // setShowControls(false);
      setShowBuyButton(true);
    }, 1000);
  };

  const handleVideoEnd = () => {
    setTimeout(() => {
      setShowControls(true);
      setShowBuyButton(false);
    }, 5000);
  };

  return (
    <>
      {hive.hiveDetails?.introVideo && (
        <IslandLayout>
          {hive.hiveDetails.communityFlier &&
          hive.hiveDetails.videoUploadGuide ? (
            <div className="home_page_content">
              <div className="intro_vid-ak-container">
                <div
                  className="intro_video_container video_gradient"
                  style={{ position: "relative", height: "533px" }}
                >
                  <video
                    muted={true}
                    id="video"
                    ref={videoRef}
                    poster={
                      // hive.hiveDetails.communityFlier ||
                      "https://images.veehive.ai/organizationImages/veehive.ai_4.webp"
                    }
                    controls={showControls}
                    autoPlay={false}
                    style={{
                      height: "533px",
                      width: "300px",
                      overflow: "hidden",
                      borderRadius: "15px",
                      background: "black",
                    }}
                    onClick={openURL}
                    onPlay={handleVideoStart}
                    onEnded={handleVideoEnd}
                  >
                    <source
                      src={hive.hiveDetails?.introVideo || ""}
                      type="video/mp4"
                    />
                  </video>
                  {showBuyButton && (
                    <div
                      className="shoppable_align"
                      style={{
                        position: "absolute",
                        // background: "rgba(0, 0, 0, 0.5)",
                        width: "300px",
                        height: "50px",
                        bottom: "60px",
                        color: "white",
                        padding: "5px 10px",
                      }}
                    >
                      <div>
                        {/* <h4 style={{ padding: "5px" }}>
                            {hiveDetails.monetizationPlan || ""}
                          </h4> */}
                        {/* <h6 style={{ padding: "5px" }}>
                          {hiveDetails.communityGuide || ""}
                        </h6> */}
                      </div>
                      <a
                        style={
                          {
                            // right: "10px",
                            // position: "absolute",
                            // top: "5px",
                          }
                        }
                        href={hive.hiveDetails.videoUploadGuide || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tertiaryBtn"
                      >
                        {hive.hiveDetails.communityBio || ""}
                        {/* Book Now */}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="home_page_content">
              <div className="intro_video_container">
                <ReactPlayer
                  muted={true}
                  url={hive.hiveDetails?.introVideo}
                  width="300px"
                  height="533px"
                  controls
                  style={{
                    overflow: "hidden",
                    borderRadius: "15px",
                    background: "black",
                  }}
                />
              </div>
            </div>
          )}
        </IslandLayout>
      )}
    </>
  );
};

export default IntroVideo;
