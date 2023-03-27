import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const Authenticator = (props) => {
  const location = useLocation()
  const user = useSelector((state) => state.user)
  return user ? (
    props.children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}
export default Authenticator
