import { BaseResponse } from "api/models/base";
import React from "react";

export const revalidate = 10;

export async function generateStaticParams() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Basic-Auth": process.env.NEXT_PUBLIC_BASIC_AUTH || "",
    },
    body: JSON.stringify({
      organizationUuid: process.env.NEXT_PUBLIC_ORG_UUID,
    }),
  };

  const channelUuids = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/community/landing/channel/list/for/build`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data: BaseResponse<string[]>) => {
      return data.data;
    });

  return channelUuids.map((channelUuid) => {
    return {
      channelUuid,
    };
  });
}

export default function Layout({
  // params,
  children,
}: {
  // params: { channelUuid: string };
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
