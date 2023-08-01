const Notification = ({ message, notificationType }) => {
  let notificationClassName = notificationType ?? "notification";

  if (message === null) {
    return null;
  }

  return <div className={notificationClassName}>{message}</div>;
};

export default Notification;
