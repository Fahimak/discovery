"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import React, { useEffect, useState } from "react";
import LineBreak from "components/LineBreak/LineBreak";
import { CircularProgress, TextField } from "@mui/material";
import EventsDateTimePicker from "./components/EventsDateTimePicker";
import BackButton from "components/BackButton/BackButton";
import { useEventsContext } from "context/Hive/events";
import dayjs from "dayjs";
import { useHiveContext } from "context/Hive/hive";
import { useRouter } from "next/navigation";
import useEventsApi from "hooks/apiHooks/Events/useEventsApi";

const CreateEvent = () => {
  const events = useEventsContext();

  useEffect(() => {
    events.setFromDate(dayjs().toDate());
    events.setToDate(dayjs().toDate());
  }, []);

  const [eventDetails, setEventDetails] = useState({
    name: "",
    description: "",
    medium: "offline",
    location: "",
    address: "",
    link: "",
  });

  const handleDetailsChange = (e: any) => {
    setEventDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMedium = (medium: string) => {
    setEventDetails((prevState) => ({ ...prevState, medium: medium }));
  };

  const fromDate = events.fromDate;
  const toDate = events.toDate;

  const hive = useHiveContext();

  const hiveUuid = hive.hiveUuid;

  const isLoading = events.isLoading;

  const { createEvent } = useEventsApi();

  const handleCreate = () => {
    events.setCurrentEvent(undefined);
    createEvent(
      eventDetails.location,
      eventDetails.name,
      eventDetails.description,
      eventDetails.address,
      eventDetails.medium
    );
  };

  const navigate = useRouter();
  const currentEvent = events.currentEvent;

  useEffect(() => {
    if (!!currentEvent) {
      navigate.push(`/events/${currentEvent.eventIdentifier}/media`);
    }
  }, [currentEvent]);

  return (
    <IslandLayout>
      <div className="create_event_container">
        <BackButton to="/events" />
        <LineBreak />
        <h2>Create an Event</h2>
        <div className="event_details_wrapper">
          <div>
            <h4>Event Name*</h4>
            <LineBreak />
            <TextField
              className="half_width"
              id="standard-basic"
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleDetailsChange}
              value={eventDetails.name}
            />
          </div>
          <div>
            <EventsDateTimePicker />
          </div>
          <div>
            <h4>Location*</h4>
            <LineBreak />
            <div className="video_limit_btns medium_btns">
              <button
                onClick={() => handleMedium("online")}
                className={`${
                  eventDetails.medium === "online"
                    ? "primaryBtn"
                    : "secondaryBtn"
                }`}
              >
                Online
              </button>
              <button
                onClick={() => handleMedium("offline")}
                className={`${
                  eventDetails.medium === "offline"
                    ? "primaryBtn"
                    : "secondaryBtn"
                }`}
              >
                In-Person
              </button>
            </div>
            <LineBreak />
            <TextField
              className="half_width"
              id="standard-basic"
              label="Location"
              placeholder={
                eventDetails.medium === "offline"
                  ? "Add Event Address or Google Maps Link"
                  : "Add Online Meet Link"
              }
              variant="outlined"
              multiline
              maxRows={4}
              name="location"
              onChange={handleDetailsChange}
              value={eventDetails.location}
            />
          </div>

          <div>
            <h4>Description/Instructions</h4>
            <LineBreak />
            <TextField
              className="half_width"
              id="standard-basic"
              label="Description"
              variant="outlined"
              multiline
              maxRows={4}
              name="description"
              onChange={handleDetailsChange}
              value={eventDetails.description}
            />
          </div>
        </div>
        {!!eventDetails.name &&
        !!eventDetails.location &&
        !!eventDetails.medium &&
        !!fromDate &&
        !!toDate ? (
          <>
            {isLoading ? (
              <div className="primaryBtn nextBtn_event">
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : (
              <div onClick={handleCreate} className="primaryBtn nextBtn_event">
                Next
              </div>
            )}
          </>
        ) : (
          <div className="disabledBtn nextBtn_event">Next</div>
        )}
      </div>
    </IslandLayout>
  );
};

export default CreateEvent;
