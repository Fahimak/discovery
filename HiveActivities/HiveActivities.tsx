"use client";
import { HiveContentItem } from "api/models/Hive/hiveActivities";
import IslandLayout from "components/IslandLayout/IslandLayout";
import { ProfileSVG } from "components/SVG/SVG";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

const HiveActivities = () => {
  const hiveConfig = useHiveConfigContext();
  const hive = useHiveContext();

  const { getHiveActivities } = useHiveApi();

  const [contentLimit, setContentLimit] = useState(6);

  useEffect(() => {
    getHiveActivities(contentLimit);
  }, [hive.hiveUuid, contentLimit]);

  const handleUserClick = (user: HiveContentItem) => {
    // dispatch(setClickedProfileId(user.profileId));
    // navigate(`/activity/users/${user.profileId}`, {
    //   state: { from: path.pathname },
    // });
  };

  const [showMoreClicked, setShowMoreClicked] = useState(false);

  const handleShowMore = () => {
    showMoreClicked ? setContentLimit(6) : setContentLimit(30);
    setShowMoreClicked((prevState) => !prevState);
  };

  return (
    <IslandLayout>
      <div className="activities_container">
        <h4>Activities</h4>
        {!!hiveConfig.activities &&
          !!hiveConfig.activities.content &&
          hiveConfig.activities.content.map((activity, idx) => {
            return (
              <div
                //   onClick={() => handleUserClick(activity)}
                className="activity_wrapper cursor-pointer"
                key={idx}
              >
                {activity.profile_photo ? (
                  <img
                    src={activity.profile_photo || ""}
                    alt=""
                    className="activity_profile_photo"
                  />
                ) : (
                  <ProfileSVG />
                )}
                <div>
                  <p className="text-sm">{activity.activity}</p>
                  <div className="bold_xs_text">
                    {activity.created_date && (
                      <h1 className="bold_xs_text">
                        <ReactTimeAgo
                          date={
                            new Date(
                              moment
                                .utc(
                                  activity.created_date
                                    .replace(/\.\d+/g, "")
                                    .replace(" ", "T")
                                    .replace(/[-:]/g, "")
                                )
                                .local()
                                .format("LLL")
                            )
                          }
                          locale="en-GB"
                        />
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="show_more_btn" onClick={handleShowMore}>
        <div className="secondaryBtn">
          Show {showMoreClicked ? "Less" : "More"}
        </div>
      </div>
    </IslandLayout>
  );
};

export default HiveActivities;
