import EventPage from "views/Events/EventPage";

export default async function EventIdPage({
  params,
}: {
  params: { eventid: string };
}) {
  return (
    <div>
      <EventPage params={params} />
    </div>
  );
}
