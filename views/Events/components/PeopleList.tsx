"use client";
import {
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import BackButton from "components/BackButton/BackButton";
import IslandLayout from "components/IslandLayout/IslandLayout";
import LineBreak from "components/LineBreak/LineBreak";
import LongText from "components/LongText";
import { useEventsContext } from "context/Hive/events";
import useEventsApi from "hooks/apiHooks/Events/useEventsApi";
import React, { useEffect, useState } from "react";

const EventPeopleList = () => {
  const events = useEventsContext();
  const currentEvent = events.currentEvent;

  const [selectedTab, setSelectedTab] = useState(0);

  const { getPeoplesList } = useEventsApi();

  useEffect(() => {
    currentEvent && getPeoplesList(selectedTab + 1);
  }, [, currentEvent]);

  const users = events.eventAttendeesList;

  const eventPeopleTabs = ["Attending", "Not Attending", "Maybe"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    currentEvent && getPeoplesList(newValue + 1);
  };
  return (
    <IslandLayout>
      <div className="event_back_btn_table">
        <BackButton to={`/events/${currentEvent?.eventIdentifier}`} />
      </div>
      <Tabs value={selectedTab} onChange={handleChange} aria-label="video tabs">
        {eventPeopleTabs.map((tab, idx) => {
          return (
            <Tab
              style={{
                width: "33.333%",
                height: "20px",
                fontFamily: "IBM Plex Sans Condensed",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                textAlign: "center",
                letterSpacing: "0.02em",
                color: "#1C1B1F",
              }}
              key={idx}
              label={<div className="vid_tab_display">{tab}</div>}
            />
          );
        })}
      </Tabs>
      <LineBreak />
      {!!users.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <p className="bold_heading_table">User Name</p>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <p className="bold_heading_table">Email</p>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <p className="bold_heading_table">Phone</p>
                </TableCell>
              </TableRow>
            </TableHead>
            {users.map((row, idx) => (
              <TableBody key={idx}>
                <TableRow
                  className="table_cell_hover"
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="user_and_profile_table">
                      <img
                        key={idx}
                        src={
                          row.profilePhoto ||
                          "https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
                        }
                        className="event_attendee_profile_table"
                      />
                      {<LongText title={row.userName || "-"} cutoff={16} /> ||
                        "-"}
                    </div>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {<LongText title={row.email || "-"} cutoff={16} /> || "-"}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {<LongText title={row.phone || "-"} cutoff={16} /> || "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      ) : (
        <h3 className="no_table_entries">No entries found</h3>
      )}
    </IslandLayout>
  );
};

export default EventPeopleList;
