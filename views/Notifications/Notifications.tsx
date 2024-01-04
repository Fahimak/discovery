"use client";
import IslandLayout from "components/IslandLayout/IslandLayout";
import PageLayout from "components/PageLayout";
import React, { useEffect } from "react";
import PageNumbers from "components/PageNumbers/PageNumbers";
import { useNotificationsContext } from "context/Hive/notifications";
import LineBreak from "components/LineBreak";
import NotificationList from "./NotificationList";
import useNotificationApi from "hooks/apiHooks/Notifications/useNotificationApi";

const NotificationPage = () => {
  const notifications = useNotificationsContext();

  const pageNo = notifications.pageNo;

  const notificationsResp = notifications.notifications;

  const { getNotifications, readNotifications } = useNotificationApi();

  useEffect(() => {
    getNotifications();

    readNotifications();
  }, [pageNo]);

  const handleNextPage = (pageNo: number) => {
    notifications.setPageNo(pageNo);
  };

  return (
    <PageLayout sideMenu={true}>
      <IslandLayout>
        <div className="notification_page_container">
          <h1>Notifications</h1>
          <LineBreak />
          {!!notificationsResp &&
          !!notificationsResp.content &&
          notificationsResp.content.length > 0 ? (
            <>
              <NotificationList />
              <LineBreak />
              <PageNumbers
                handleChange={handleNextPage}
                initialPage={pageNo}
                totalPages={notificationsResp.totalPages}
              />
            </>
          ) : (
            <div>No Notifications</div>
          )}
        </div>
      </IslandLayout>
    </PageLayout>
  );
};
export default NotificationPage;
