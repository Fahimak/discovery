import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import LineBreak from "components/LineBreak/LineBreak";
import { useEventsContext } from "context/Hive/events";

const yesterday = dayjs().subtract(1, "day");

const EventsDateTimePicker = () => {
  const events = useEventsContext();

  const handleChange = (d: any, val: string) => {
    val === "from"
      ? events.setFromDate(d?.toDate() || dayjs().startOf("day").toDate())
      : events.setToDate(d?.toDate() || dayjs().endOf("day").toDate());
  };

  const fromDate = events.fromDate;
  const toDate = events.toDate;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="events_date_time_picker">
        <div>
          <h4>From*</h4>
          <LineBreak />
          <DateTimePicker
            onChange={(d) => handleChange(d, "from")}
            defaultValue={dayjs(fromDate) || yesterday}
            value={dayjs(fromDate)}
            views={["year", "month", "day", "hours", "minutes"]}
          />
        </div>
        <div>
          <h4>To*</h4>
          <LineBreak />

          <DateTimePicker
            onChange={(d) => handleChange(d, "to")}
            defaultValue={dayjs(toDate) || yesterday}
            value={dayjs(toDate)}
            views={["year", "month", "day", "hours", "minutes"]}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default EventsDateTimePicker;
