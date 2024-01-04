"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import Loader from "components/Loader/Loader";
import {
  CopyLinkSVG,
  EditIconSVG,
  GreenCheckmarkSVG,
  GreenTickSVG,
  LocationSVG,
  RedCrossSVG,
} from "components/SVG/SVG";
import { useChildComponentsContext } from "context/Hive/childComponents";
import { useEventsContext } from "context/Hive/events";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import useEventsApi from "hooks/apiHooks/Events/useEventsApi";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const EventPage = ({ params }: { params: { eventid: string } }) => {
  const events = useEventsContext();
  const hive = useHiveContext();

  const hiveUuid = hive.hiveUuid;

  localStorage.setItem("path", params.eventid);

  const navigate = useRouter();

  const { getEventDetails, registerEvent, getAttendeesList, getOrgOwner } =
    useEventsApi();

  useEffect(() => {
    getEventDetails(params.eventid);
  }, [params.eventid]);

  const currentEvent = events.currentEvent;

  useEffect(() => {
    getAttendeesList(params.eventid);
    getOrgOwner(params.eventid);
  }, [currentEvent, hiveUuid]);

  const eventResp = events.eventResp;
  const orgOwner = events.eventOwner;
  const attendeesList = events.eventAttendeesList;

  const [registerType, setRegisterType] = useState(eventResp?.hasAccess || 0);

  const handleSetRegister = (val: number) => {
    setRegisterType(val);
    registerEvent(val);
  };

  const { launchLogin } = useHiveApi();
  const { ToastInfo } = useHiveConfigContext();

  const handleRegister = () => {
    if (localStorage.getItem("isLoggedIn") === "yes") {
    } else {
      localStorage.setItem("path", params.eventid);
      launchLogin();
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(document.location.href)
      .then(() => {
        if (!!document.location.href) {
          ToastInfo("Copied link to clipboard");
        } else {
          ToastInfo(
            "This story isnt available at the moment, please try another one"
          );
        }
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

  const handleEdit = () => {
    navigate.push(`/events/${currentEvent?.eventIdentifier}/edit`);
  };

  const child = useChildComponentsContext();

  const childComponents = child.childComponents;

  const isLoading = events.isLoading;

  const handleAttendeesClick = () => {
    if (!!childComponents[0]) {
      navigate.push(`/events/${currentEvent?.eventIdentifier}/attendees`);
    }
  };

  return (
    <IslandLayout>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <div className="">
            <img
              alt="event_banner"
              className="home_event_banner"
              src={
                currentEvent?.eventBanner ||
                "https://veehivestage-images.s3.us-east-2.amazonaws.com/organizationImages/banner.png"
              }
            />
            <LineBreak />
          </div>
          <div className="event_copy_btn_wrapper">
            <div onClick={handleCopy} className="secondaryBtn event_copy_btn">
              <CopyLinkSVG />
              <p>Share</p>
            </div>
          </div>
          <div className="event_page_container">
            <div className="home_event_header">
              <img
                alt="event_logo"
                className="home_event_thumbnail"
                src={
                  currentEvent?.eventThumbnail ||
                  "https://images.veehive.ai/organizationImages/logo_org.png"
                }
              />
              <div>
                <h2>{currentEvent?.eventName}</h2>
                <h3 className="event_location_view_wrapper">
                  {currentEvent?.eventMedium === "online"
                    ? "Online"
                    : "In-Person"}{" "}
                  {"("}
                  {moment
                    .utc(currentEvent?.eventStartDate)
                    .local()
                    .format("LLL")}
                  {" - "}
                  {moment.utc(currentEvent?.eventEndDate).local().format("LLL")}
                  {")"}
                </h3>
              </div>
              {childComponents[0] && (
                <div onClick={handleEdit} className="edit_event_details_icon">
                  <EditIconSVG />
                </div>
              )}
            </div>
            <LineBreak />

            <div className="home_event_body">
              <div>
                <h2>
                  Hosted on {eventResp?.organizationDetail.organizationName}
                </h2>
                <h3 className="text-gray-light">
                  with {eventResp?.hostDetails.userName}
                </h3>
              </div>
              <hr></hr>
              <h2>Where</h2>
              <div className="event_deet_location">
                <LocationSVG />
                <p>
                  {currentEvent?.eventMedium === "online"
                    ? "Online"
                    : "In-Person"}{" "}
                  {"("}
                  <a
                    className="link"
                    href={currentEvent?.eventLocation}
                    target="_blank"
                  >
                    {currentEvent?.eventLocation.slice(0, 50)}
                  </a>
                  {")"}
                </p>
              </div>
              {!!currentEvent?.eventDescription && <hr></hr>}
              {!!currentEvent?.eventDescription && <h2>Event Details</h2>}
              {currentEvent?.eventDescription && (
                <p>{currentEvent.eventDescription.slice(0, 300)}</p>
              )}
              {currentEvent?.eventVideo && <hr></hr>}
              {currentEvent?.eventVideo && (
                <ReactPlayer
                  muted={true}
                  url={currentEvent?.eventVideo}
                  width="300px"
                  height="533px"
                  controls
                  style={{
                    overflow: "hidden",
                    borderRadius: "15px",
                    background: "black",
                  }}
                />
              )}
              {!!attendeesList.length && attendeesList.length > 1 && <hr></hr>}
              {!!attendeesList.length && attendeesList.length > 1 && (
                <h2>{attendeesList.length} people attending</h2>
              )}
              {!!attendeesList.length && attendeesList.length > 1 && (
                <div
                  onClick={handleAttendeesClick}
                  className="event_attendee_profile_list"
                >
                  {attendeesList.map((user, idx) => {
                    if (idx < 6)
                      return (
                        <img
                          key={idx}
                          src={
                            user.profilePhoto ||
                            "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                          }
                          className="event_attendee_profile"
                        />
                      );
                  })}
                </div>
              )}
            </div>
            <LineBreak />
            <div className="home_event_body_org_info">
              <div className="event_info_header">
                This event is part of a hive
              </div>
              <div className="home_event_body_org_info_content">
                <div className="title_and_limit">
                  <div>
                    <h2>{eventResp?.organizationDetail.organizationName}</h2>
                    <h3 className="text-gray-light">by {orgOwner?.userName}</h3>
                  </div>
                  <img
                    src={
                      orgOwner?.profilePhoto ||
                      "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                    }
                    alt="hive_owner_profile"
                    className="home_event_thumbnail"
                  />
                </div>
                {/* <LineBreak /> */}
                <p>{eventResp?.organizationDetail.organizationDesc}</p>
              </div>
            </div>
            <LineBreak />
            <div className="home_event_body">
              {localStorage.getItem("isLoggedIn") === "yes" && <h2>RSVP ?</h2>}
              {localStorage.getItem("isLoggedIn") === "yes" ? (
                <div className="nextBtn_events">
                  <div
                    onClick={() => handleSetRegister(1)}
                    className={`${
                      eventResp?.hasAccess === 1 ? "primaryBtn" : "secondaryBtn"
                    } event_btn_next`}
                  >
                    <GreenTickSVG />
                    <p>Yes</p>
                  </div>
                  <div
                    onClick={() => handleSetRegister(2)}
                    className={`${
                      eventResp?.hasAccess === 2 ? "primaryBtn" : "secondaryBtn"
                    } event_btn_next`}
                  >
                    <RedCrossSVG />
                    <p>No</p>
                  </div>
                  <div
                    onClick={() => handleSetRegister(3)}
                    className={
                      eventResp?.hasAccess === 3 ? "primaryBtn" : "secondaryBtn"
                    }
                  >
                    Maybe
                  </div>
                </div>
              ) : (
                <h3
                  onClick={handleRegister}
                  className="text-gray-light pointer"
                >
                  <b className="link">Sign in</b> to register your RSVP
                </h3>
              )}
            </div>
          </div>
          <div className="event_back_btn secondaryBtn">
            <Link href="/events" className="go_back black_text">
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7H1M1 7L7 13M1 7L7 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Back</p>
            </Link>
          </div>
        </>
      )}
    </IslandLayout>
  );
};

export default EventPage;
