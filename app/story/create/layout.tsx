"use client";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import PageLayout from "components/PageLayout";
import { CloseMediaSVG } from "components/SVG/SVG";
import { useRouter } from "next/navigation";
import SegmentAnalytics from "views/Story/ViewStory/SegmentAnalytics";

export default function ViewStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useRouter();

  const handleClose = () => {
    navigate.push("/story");
  };

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="create_story_container story_home_container">
          <LineBreak />
          <h2>Upload a story</h2>
          <LineBreak />
          <p>Create captivating stories and mobile-optimized videos.</p>
          <LineBreak />
          {children}
        </div>
      </IslandLayout>
    </PageLayout>
  );
}
