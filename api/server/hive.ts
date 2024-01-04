import { HiveDetails, Metadata } from "api/models/Hive/hiveDetails";
import { BaseResponse } from "api/models/base";

export async function DynamicMetadata() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Basic-Auth": process.env.NEXT_PUBLIC_BASIC_AUTH || "",
    },
    body: `{"organizationUuid": "9262600fcc7f4b269043d2377487fc79"}`,
  };
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/webApp/noAuth/hive/meta/data`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data: BaseResponse<Metadata>) => {
      return data.data;
    });
  if (!!data) {
    return {
      title: data.title,
      description: data.description,
      openGraph: {
        images: [data.image],
      },
    };
  } else {
    return {
      title: "Veehive.ai",
      description: "Videofy your reach",
      openGraph: {
        images: [
          "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityLogo/9262600fcc7f4b269043d2377487fc79TueJan10081244GMT2023",
        ],
      },
    };
  }
}
