import ContactSection from "components/ContactSection/ContactSection";
import HiveActivities from "components/HiveActivities/HiveActivities";
import IslandLayout from "components/IslandLayout";
import LineBreak from "components/LineBreak";
import OnlineMembers from "components/OnlineMembers/OnlineMembers";
import SocialLinks from "components/SocialLinks";
import React, { useState, useEffect } from "react";

const HiveConfig = () => {
  //   const hiveActivities = useAppSelector(getHiveActivitiesSelector);
  //   const lessActivties = useAppSelector(lessHiveDetailsSelector);
  //   const contactInfo = useAppSelector(getHiveContactSelector);

  //   const hiveConfigMenu = useAppSelector(getHiveConfigMenuSelector);

  //   const dispatch = useAppDispatch();

  //   const [showMoreClicked, setShowMoreClicked] = useState(false);

  //   const handleShowMore = () => {
  //     setShowMoreClicked((prevState) => !prevState);
  //   };

  //   const hiveDetails = useAppSelector(getHiveSelector);

  //   useEffect(() => {
  //     hiveDetails &&
  //       dispatch(
  //         getHiveActivities({
  //           communityId: hiveDetails?.communityId!,
  //           pageNo: 0,
  //           contentLimit: 30,
  //         })
  //       );
  //   }, [hiveDetails, dispatch]);

  //   const hiveUuid = useAppSelector(getHiveUuid);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       dispatch(
  //         getOnlineMembers({
  //           organizationUuid: hiveUuid,
  //         })
  //       );
  //     }, 5000);
  //   }, [hiveUuid]);

  //   useEffect(() => {
  //     dispatch(
  //       getOnlineMembers({
  //         organizationUuid: hiveUuid,
  //       })
  //     );
  //     const intervalId = setInterval(() => {
  //       dispatch(
  //         getOnlineMembers({
  //           organizationUuid: hiveUuid,
  //         })
  //       );
  //     }, 30000);

  //     return () => clearInterval(intervalId);
  //   }, [dispatch, hiveUuid]);

  //   useEffect(() => {
  //     hiveDetails &&
  //       dispatch(getContactInfo({ organizationUuid: hiveDetails.communityUuid }));
  //   }, [dispatch, hiveDetails]);

  //   const onlineMembers = useAppSelector(getOnlineMembersSelector);

  return (
    <div className="hive_config_container">
      <IslandLayout>
        <SocialLinks />
      </IslandLayout>
      <LineBreak />
      <IslandLayout>
        <ContactSection />
      </IslandLayout>
      <LineBreak />
      <OnlineMembers />
      <LineBreak />
      <HiveActivities />
    </div>
  );
};

export default HiveConfig;
