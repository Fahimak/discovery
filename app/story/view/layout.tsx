"use client";
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
    <div className="main_container_view_story">
      <div onClick={handleClose} className="view_story_close_btn pointer">
        <CloseMediaSVG />
      </div>
      <div className="spacer"></div>
      <div className="view_story_outlet_container">{children}</div>
      <div className="segment_analytics_container">
        <SegmentAnalytics />
      </div>
    </div>
  );
}
