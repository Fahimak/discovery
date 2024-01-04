"use client";

import { CircularProgress } from "@mui/material";
import Buttons from "components/Buttons";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import { UsersSVG, VideosSVG } from "components/SVG/SVG";
import { useChannelContext } from "context/Channel/channel";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { Suspense } from "react";
import ChannelVideos from "./ChannelVideos";
import { ChannelItemModel } from "api/models/Channel/channelDetails";

interface Props {
  channel: ChannelItemModel;
}

const ChannelInfo = ({ channel }: Props) => {
  // const channel = useChannelContext();

  const child = useChildComponentsContext();

  return (
    <Suspense fallback={<CircularProgress size={20} color="inherit" />}>
      <div className="channel_page_container">
        <IslandLayout>
          <div className="channel_content">
            <div className="channel_header">
              <img
                className="channel_page_logo"
                src={
                  channel.objChannelProperties?.webLogo ||
                  "https://veehivestage-images.s3.us-east-2.amazonaws.com/channelImages/defaultChannelLogo.jpg"
                }
                alt=""
              />
              <div className="channel_info">
                <div>
                  <h4>{channel.objChannel.channelName}</h4>
                  <p className="small_text">
                    {channel.objChannelProperties.channelTier === "INVITE" ||
                    channel.objChannelProperties.channelTier === "PRIVATE_PAID"
                      ? "Private"
                      : "Public"}
                  </p>
                </div>
                <div>
                  <p>{channel.objChannel.description}</p>
                  <div className="channel_metrics_container">
                    <div className="channel_metric_wrapper">
                      <VideosSVG />
                      <p className="text-sm">{0}</p>
                    </div>
                    <div className="channel_metric_wrapper">
                      <UsersSVG />
                      <p className="text-sm">{0}</p>
                    </div>
                  </div>
                </div>
                {!!child.channelComponents && (
                  <div className="channel_btns">
                    {child.channelComponents.map((button, id) => {
                      return (
                        <Buttons button={button} key={id}>
                          {button.componentType === "icon" ? (
                            <img
                              src={button.componentIcon}
                              alt=""
                              width="20px"
                            />
                          ) : (
                            button.componentName
                          )}
                        </Buttons>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {!!channel.objChannelPayment.amount &&
              channel.objChannelPayment.amount > 0 && (
                <div className="channel_amount_wr">
                  $ {+channel.objChannelPayment.amount}
                </div>
              )}
          </div>
        </IslandLayout>
        <LineBreak />

        <ChannelVideos />
      </div>
    </Suspense>
  );
};

export default ChannelInfo;
