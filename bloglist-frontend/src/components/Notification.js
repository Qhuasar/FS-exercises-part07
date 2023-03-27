import { useSelector } from "react-redux"

const mystyle = {
  color: "white",
  backgroundColor: "black",
  padding: 10,
  fontFamily: "Arial",
}

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return <p id={"green-notf"}style={mystyle}>{notification}</p>
}

Notification.displayName = "Notification"
export default Notification
