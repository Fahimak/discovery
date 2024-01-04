import { useNotificationsContext } from "context/Hive/notifications";

const NotificationList = () => {
  const context = useNotificationsContext();

  const notifications = context.notifications;

  return (
    <div className="notification_items_container">
      {notifications?.content.map((data, idx) => {
        return (
          <div key={idx}>
            <div className="notification_item_container">
              <img
                className="notification_user_img"
                src="https://veehivestage-images.s3.us-east-2.amazonaws.com/profileImage/defaultAvatar.png"
              />
              <div>
                <div className="vid_tab_display">
                  <h4>{data.title}</h4>
                  {!data.isRead && <span className="readed_tab_badge" />}
                </div>
                <p>{data.message || ""}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
