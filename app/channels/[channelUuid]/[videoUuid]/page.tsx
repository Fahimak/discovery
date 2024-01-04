import { VideoListItem, VideoListModel } from "api/models/Videos/videoList";
import { BaseResponse } from "api/models/base";
import Head from "next/head";
import VideoView from "views/Channel/Video/VideoView";
import { headers } from "next/headers";
import { ChannelItemModel } from "api/models/Channel/channelDetails";

export const revalidate = 10;

export async function generateStaticParams({
  params,
}: {
  params: { channelUuid: string };
}) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Basic-Auth": process.env.NEXT_PUBLIC_BASIC_AUTH || "",
    },
    body: JSON.stringify({
      channelID: params.channelUuid,
    }),
  };

  const videoList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/content/landing/list/uuid`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data: BaseResponse<string[]>) => {
      return data.data;
    });
  return videoList.map((videoUuid) => {
    console.log(
      `https://discover.veehive.ai/channels/${params.channelUuid}/${videoUuid}`
    );

    return {
      videoUuid,
    };
  });
}

async function getPost(uuid: string, channelUuid: string) {
  const getRequestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Basic-Auth": process.env.NEXT_PUBLIC_BASIC_AUTH || "",
    },
    body: JSON.stringify({
      channelID: channelUuid,
      videoId: uuid,
    }),
  };
  const video = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/content/landing/details/uuid`,
    getRequestOptions
  )
    .then((response) => response.json())
    .then((data: BaseResponse<VideoListItem>) => {
      return data.data;
    });

  return video;
}

async function getChannel(channelUuid: string) {
  const getRequestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Basic-Auth": process.env.NEXT_PUBLIC_BASIC_AUTH || "",
    },
  };
  const channel = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/webApp/noAuth/get/details/uuid/${channelUuid}`,
    getRequestOptions
  )
    .then((response) => response.json())
    .then((data: BaseResponse<ChannelItemModel>) => {
      return data.data;
    });

  return channel;
}

export default async function Page({
  params,
}: {
  params: { videoUuid: string; channelUuid: string };
}) {
  const video = await getPost(params.videoUuid, params.channelUuid);
  const channel = await getChannel(params.channelUuid);

  if (!!video.videoUuid) {
    return (
      <>
        <head>
          <title>{video.name}</title>
          <meta property="og:image" content={video.thumbnail} />
        </head>
        <VideoView channel={channel} currentVideo={video} />
      </>
    );
  } else {
    return <></>;
  }
}
