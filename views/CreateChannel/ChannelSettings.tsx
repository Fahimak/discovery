import React, { useEffect, useState } from "react";
import Switch from "@mui/joy/Switch";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import { useCreateChannelContext } from "context/Channel/createChannel";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

const ChannelSettings = () => {
  const createChannel = useCreateChannelContext();

  const amount = createChannel.amount;
  const isPaid = createChannel.isPaid;
  const isAds = createChannel.isAds;
  const isPrivate = createChannel.isPrivate;
  const videoDuration = createChannel.videoDuration;

  const { ToastInfo } = useHiveConfigContext();

  useEffect(() => {
    createChannel.setVideoDuration(0);
    createChannel.setIsAds(false);
    createChannel.setIsPrivate(false);
    createChannel.setIsPaid(false);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <div className="channel_duration_container">
          <p className="gradient">Video Duration Limit</p>
          <div className="video_limit_btns">
            <button
              onClick={() => createChannel.setVideoDuration(60)}
              className={`${
                videoDuration === 60 ? "primaryBtn" : "secondaryBtn"
              }`}
            >
              1 min
            </button>
            <button
              onClick={() => createChannel.setVideoDuration(180)}
              className={`${
                videoDuration === 180 ? "primaryBtn" : "secondaryBtn"
              }`}
            >
              3 mins
            </button>
            <button
              onClick={() => createChannel.setVideoDuration(300)}
              className={`${
                videoDuration === 300 ? "primaryBtn" : "secondaryBtn"
              }`}
            >
              5 mins
            </button>
            <button
              onClick={() => createChannel.setVideoDuration(600)}
              className={`${
                videoDuration === 600 ? "primaryBtn" : "secondaryBtn"
              }`}
            >
              10 mins
            </button>
          </div>
        </div>
        <div className="channel_setting_container">
          <Switch
            checked={isPrivate}
            onChange={(event) =>
              createChannel.setIsPrivate(event.target.checked)
            }
          />
          <p>Set channel visibility to private</p>
        </div>
        <div className="channel_setting_container">
          <Switch
            checked={isAds}
            onChange={(event) => createChannel.setIsAds(event.target.checked)}
          />
          <p>Enable Advertisements</p>
        </div>
        <div className="channel_paid_container">
          <div className="switch_display">
            <Switch
              checked={isPaid}
              onChange={(event) =>
                createChannel.setIsPaid(event.target.checked)
              }
            />
            <p>Paid</p>
          </div>
          {isPaid && (
            <div className="channel_amount_wrapper">
              <input
                className="outline-none"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  if (+e.target.value > 499) {
                    ToastInfo("Please enter amount less than 500");
                  }
                  /^\d*(\.\d{0,2})?$/.test(e.target.value) &&
                    (+e.target.value < 500 || e.target.value === "") &&
                    createChannel.setAmount(e.target.value);
                }}
              />
              <h5 className="">USD</h5>
            </div>
          )}
        </div>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default ChannelSettings;
