import PageLayout from "components/PageLayout/PageLayout";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout sideMenu={true}>
      <section>{children}</section>
    </PageLayout>
  );
}
