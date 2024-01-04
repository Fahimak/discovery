import {
  ChannelDetailsModel,
  ChannelItemModel,
  ChannelObject,
} from "api/models/Channel/channelDetails";
import { BaseResponse } from "api/models/base";
import PageLayout from "components/PageLayout/PageLayout";
import ChannelPage from "views/Channel/ChannelPage";

async function getPost(channelUuid: string) {
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
  params: { channelUuid: string };
}) {
  const channel = await getPost(params.channelUuid);

  return (
    <>
      <head>
        <title>{channel.objChannel.channelName}</title>
        <meta name="description" content={channel.objChannel.description} />
        <meta property="og:image" content={channel.objChannelProperties.logo} />
      </head>
      <PageLayout sideMenu={true}>
        <ChannelPage channel={channel} />
      </PageLayout>
    </>
  );
}
