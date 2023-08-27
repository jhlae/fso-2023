import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 800,
    marginBottom: 20,
  };
  return (
    notification.message && <div style={style}>{notification.message}</div>
  );
};

export default Notification;
