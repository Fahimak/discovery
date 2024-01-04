"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import { useHiveContext } from "context/Hive/hive";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import useHiveApi from "hooks/apiHooks/Hive/useHiveApi";
import React, { useEffect } from "react";

const OnlineMembers = () => {
  const hive = useHiveContext();

  const hiveConfig = useHiveConfigContext();

  const { getOnlineMembers } = useHiveApi();

  useEffect(() => {
    getOnlineMembers();
    const intervalId = setInterval(() => {
      getOnlineMembers();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [hive.hiveUuid]);

  return (
    <>
      {!!hiveConfig.onlineMembers && (
        <IslandLayout>
          <div className="activities_container online_members_container scrollable-y">
            <div className="title_and_limit">
              <h4>Online Members</h4>
              <p className="green_text">{hiveConfig.onlineMembers.length}</p>
            </div>
            {/* {onlineMembers.map((member, idx) => {
          return (
            <div className="online_members_wrapper" key={idx}>
            <div className="activity_wrapper">
            {member.profilePhoto ? (
              <img
              src={member.profilePhoto || ""}
              alt=""
              className="activity_profile_photo"
              />
              ) : (
                <div className="default_profile_pic">
                <ProfileSVG />
                </div>
                )}
                <div>
                <p className="text-sm">{member.userName}</p>
                </div>
                </div>
                <div className="online_status_wrapper">
                <OnlineSVG />
                </div>
                </div>
                );
              })} */}
          </div>
        </IslandLayout>
      )}
    </>
  );
};

export default OnlineMembers;
