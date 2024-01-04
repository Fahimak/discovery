"use client";
import api from "api";
import { getFeedApi } from "api/actions/Feed/feed";
import { useFeedContext } from "context/Feed/feed";
import { useHiveContext } from "context/Hive/hive";
import { useNotificationsContext } from "context/Hive/notifications";

export const useNotificationApi = () => {
  const notifications = useNotificationsContext();
  const hive = useHiveContext();

  const getNotifications = async () => {
    notifications.setIsLoading(true);
    try {
      const data = await api.notifications.getUserNotification({
        organizationUuid: hive.hiveUuid,
        page: notifications.pageNo,
        limit: 15,
      });

      if (data.data.responseInfo.httpCode === 200) {
        notifications.setNotifications(data.data.data);
      } else {
      }
    } catch {}
    notifications.setIsLoading(false);
  };

  const readNotifications = async () => {
    notifications.setIsLoading(true);
    try {
      const data = await api.notifications.readUserNotification({
        organizationUuid: hive.hiveUuid,
      });

      if (data.data.responseInfo.httpCode === 200) {
      } else {
      }
    } catch {}
    notifications.setIsLoading(false);
  };

  return {
    getNotifications,
    readNotifications,
  };
};

export default useNotificationApi;
