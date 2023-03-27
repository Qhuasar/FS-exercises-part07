import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import loginServices from "../services/users"
import blogService from "../services/blogs"
import { setUser } from "../reducers/userReducer"
import { changeNotification } from "../reducers/notificationReducer"

const Loginform = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const origin = location.state.from.pathname || "/"

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const newUser = await loginServices.loginUser({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      dispatch(setUser(newUser))
      setPassword("")
      setUsername("")
      navigate("/")
    } catch (error) {
      dispatch(changeNotification("Wrong credentials", 5))
    }
  }
  const user = useSelector((state) => state.user)
  const form = () => {
    return (
      <form onSubmit={(e) => handleLogin(e)}>
        <h1>Login </h1>
        <label>username: </label>
        <input
          onChange={(event) => props.handleChange(event, setUsername)}
          value={username}
          id={"username"}
        />
        <p />
        <label>password: </label>
        <input
          onChange={(event) => props.handleChange(event, setPassword)}
          value={password}
          id={"password"}
        />
        <p />
        <button type="submit">Login</button>
      </form>
    )
  }
  return <div>{user ? <Navigate replace to={origin} /> : form()}</div>
}

Loginform.displayName = "LoginForm"
export default Loginform
