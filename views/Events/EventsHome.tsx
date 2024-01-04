"use client";
import React, { useEffect } from "react";
import IslandLayout from "components/IslandLayout/IslandLayout";
import Buttons from "components/Buttons/Buttons";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useHiveContext } from "context/Hive/hive";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import useHiveComponentsApi from "hooks/apiHooks/Hive/useHiveComponentsApi";
import { useEventsContext } from "context/Hive/events";
import EventsCalendar from "./components/EventsCalendar";
import useEventsApi from "hooks/apiHooks/Events/useEventsApi";

const EventsHome = () => {
  const child = useChildComponentsContext();
  const hive = useHiveContext();

  const childComponents = child.childComponents;
  const events = useEventsContext();

  const hiveUuid = hive.hiveUuid;

  const { getEventsList } = useEventsApi();

  useEffect(() => {
    getEventsList();
  }, [hiveUuid]);

  const handleClick = () => {
    events.setCurrentEvent(undefined);
  };

  const { getChildComponents } = useHiveComponentsApi();

  useEffect(() => {
    hive.hiveDetails && getChildComponents("Events", "");
  }, [hive.hiveDetails]);

  const { launchLogin } = useHiveApi();

  useEffect(() => {
    localStorage.setItem("path", "/events");
    if (localStorage.getItem("isLoggedIn") !== "yes") launchLogin();
  }, []);

  return (
    <IslandLayout>
      <div className="events_main_container">
        <div className="events_header">
          <h2>Your Events</h2>
          <div onClick={handleClick}>
            {!!childComponents.length &&
              childComponents.map((button, idx) => (
                <Buttons key={idx} redirect={`/events/create`} button={button}>
                  {button.componentName}
                </Buttons>
              ))}
          </div>
        </div>
        <EventsCalendar />
      </div>
    </IslandLayout>
  );
};

export default EventsHome;
