import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEventsContext } from "context/Hive/events";
import { useRouter } from "next/navigation";
const events = [
  {
    title: "Community Event 1",
    start: "2023-07-14T10:30:00",
    end: "2023-07-14T12:30:00",
    uuid: "dacscv sv",
  },
  {
    title: "Community Event 2",
    start: "2023-07-15T14:00:00",
    end: "2023-07-15T16:00:00",
    uuid: "aicaioshvnc ioahsnvi",
  },
];

const EventsCalendar = () => {
  const events = useEventsContext();

  const eventsList = events.eventList;

  const navigate = useRouter();

  const handleEventClick = (event: any) => {
    navigate.push(`/events/${event.event.extendedProps.eventIdentifier}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={eventsList}
      headerToolbar={{
        left: "title",
        right: "prev,next",
      }}
      dayCellClassNames="ak_day_cell"
      eventClassNames="event_class_name"
      dayHeaderClassNames="day_header_class"
      slotLabelClassNames="event_slot_label"
      viewClassNames="event_view_class"
      eventClick={handleEventClick}
    />
  );
};

export default EventsCalendar;
