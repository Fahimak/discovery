import { DynamicMetadata } from "api/server/hive";
import "./globals.css";
import { GlobalContextProvider } from "context/config";
import { ProfileContextProvider } from "context/Profile/profile";
import { HiveContextProvider } from "context/Hive/hive";
import "styles/index.scss";
import Navbar from "components/Navbar";
import InitializeApp from "components/InitializeApp/InitializeApp";
import { FeedContextProvider } from "context/Feed/feed";
import { ChannelContextProvider } from "context/Channel/channel";
import { VideoContextProvider } from "context/Videos/videos";
import { Inter } from "next/font/google";
import AlertPopUp from "components/AlertPopUp/AlertPopUp";
import { StoryContextProvider } from "context/Story/stories";
import { ChatContextProvider } from "context/Chat/chat";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const metadata = await DynamicMetadata();

    return metadata;
  } catch {
    return {
      title: "Not Found",
    };
  }
}

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata = await DynamicMetadata();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://community.veehive.ai",
    logo: "https://veehiveprod-images.s3.ap-south-1.amazonaws.com/organizationImages/communityLogo/9262600fcc7f4b269043d2377487fc79TueJan10081244GMT2023",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={metadata.openGraph.images[0]} />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />{" "}
      </head>
      <body className={inter.className}>
        <GlobalContextProvider>
          <HiveContextProvider>
            <ProfileContextProvider>
              <FeedContextProvider>
                <ChannelContextProvider>
                  <VideoContextProvider>
                    <StoryContextProvider>
                      <ChatContextProvider>
                        <div className="main_container">
                          <Navbar />
                          <div className="layout_container">
                            <InitializeApp />
                            <div className="main_body_container">
                              {children}
                            </div>
                          </div>
                        </div>
                      </ChatContextProvider>
                      <AlertPopUp />
                    </StoryContextProvider>
                  </VideoContextProvider>
                </ChannelContextProvider>
              </FeedContextProvider>
            </ProfileContextProvider>
          </HiveContextProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
