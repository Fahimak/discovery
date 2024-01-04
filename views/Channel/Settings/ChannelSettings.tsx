import React, { useEffect } from "react";
import Switch from "@mui/joy/Switch";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import IslandLayout from "components/IslandLayout";
import BackButton from "components/BackButton";
import ChannelTabs from "components/ChannelTabs";
import { CircularProgress } from "@mui/material";
import { useChannelContext } from "context/Channel/channel";
import PageLayout from "components/PageLayout/PageLayout";
import useChannelApi from "hooks/apiHooks/Channel/useChannelApi";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

const EditChannelSettings = () => {
  const channel = useChannelContext();

  const channelObj = channel.channelDetails?.objChannel;
  const channelProps = channel.channelDetails?.objChannelProperties;

  const amount = channel.amount;
  const isPaid = channel.isPaid;
  const isAds = channel.isAds;
  const isPrivate = channel.isPrivate;
  const videoDuration = channel.videoDuration;

  const { ToastSuccess, ToastInfo, ToastError } = useHiveConfigContext();

  const isLoading = channel.isLoading;

  const { editChannelSettingsApi } = useChannelApi();

  const handleSave = () => {
    editChannelSettingsApi();
  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider>
          <div className="channel_duration_container">
            <p className="gradient">Video Duration Limit</p>
            <div className="video_limit_btns">
              <button
                onClick={() => channel.setVideoDuration(60)}
                className={`${
                  videoDuration === 60 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                1 min
              </button>
              <button
                onClick={() => channel.setVideoDuration(180)}
                className={`${
                  videoDuration === 180 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                3 mins
              </button>
              <button
                onClick={() => channel.setVideoDuration(300)}
                className={`${
                  videoDuration === 300 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                5 mins
              </button>
              <button
                onClick={() => channel.setVideoDuration(600)}
                className={`${
                  videoDuration === 600 ? "primaryBtn" : "secondaryBtn"
                }`}
              >
                10 mins
              </button>
            </div>
          </div>
          {!channelProps?.defaultChannel && (
            <div className="channel_setting_container">
              <Switch
                checked={isPrivate}
                onChange={(event) => channel.setIsPrivate(event.target.checked)}
              />
              <p>Set channel visibility to private</p>
            </div>
          )}
          <div className="channel_setting_container">
            <Switch
              checked={isAds}
              onChange={(event) => channel.setIsAds(event.target.checked)}
            />
            <p>Enable Advertisements</p>
          </div>
          {!channelProps?.defaultChannel && (
            <div className="channel_paid_container">
              <div className="switch_display">
                <Switch
                  checked={isPaid}
                  onChange={(event) => channel.setIsPaid(event.target.checked)}
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
                        +e.target.value < 500 &&
                        channel.setAmount(e.target.value);
                    }}
                  />
                  <h5 className="">USD</h5>
                </div>
              )}
            </div>
          )}
        </CssVarsProvider>
      </StyledEngineProvider>
      <>
        {isLoading ? (
          <div className="nextBtn primaryBtn">
            <CircularProgress size={20} color="inherit" />
          </div>
        ) : (
          <div onClick={handleSave} className="nextBtn primaryBtn">
            Save
          </div>
        )}
      </>
    </div>
  );
};

export default EditChannelSettings;
