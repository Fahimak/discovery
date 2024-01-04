import IslandLayout from "components/IslandLayout/IslandLayout";
import PageLayout from "components/PageLayout/PageLayout";

export default function HiveSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>{children}</IslandLayout>
    </PageLayout>
  );
}
