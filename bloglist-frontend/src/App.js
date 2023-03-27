import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import Loginform from "./components/Login"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { setBlogs } from "./reducers/blogsReducer"
import { setUser } from "./reducers/userReducer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Users from "./components/Users"
import UserInfo from "./components/UserInfo"
import Authenticator from "./components/Auth0"
import BlogList from "./components/BlogList"
import BlogInformation from "./components/BlogInformation"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { Nav } from "react-bootstrap"

const App = () => {
  const newNotification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [refreshBlogs, setRefreshBlogs] = useState(0)

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      dispatch(
        setBlogs(
          blogs.sort((a, b) => {
            if (a.likes > b.likes) return -1
            if (a.likes < b.likes) return 1
            return 0
          })
        )
      )
    )
  }, [refreshBlogs])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleChange = (event, setState) => {
    event.preventDefault()
    setState(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    dispatch(setUser(null))
  }

  const NavBar = () => {
    return (
      <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Blogs</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
    )
  }

  const displayLoggedIn = () => (
    <div>
      <NavBar />
      {user.username} logged in:
      <button type="submit" onClick={() => handleLogout()}>
        logout
      </button>
    </div>
  )

  return (
    <Router>
      <div className="container">
        {user !== null && displayLoggedIn()}
        {newNotification !== null && <Notification msg={newNotification} />}
        <Routes>
          <Route
            path="/"
            element={
              <Authenticator>
                <BlogList
                  setRefreshBlogs={setRefreshBlogs}
                  refreshBlogs={refreshBlogs}
                  handleChange={handleChange}
                />
              </Authenticator>
            }
          />
          <Route
            path="/users"
            element={
              <Authenticator>
                <Users />
              </Authenticator>
            }
          />
          <Route
            path="/users/:id"
            element={
              <Authenticator>
                <UserInfo />
              </Authenticator>
            }
          />
          <Route
            path="/login"
            element={<Loginform handleChange={handleChange} />}
          />
          <Route
            path="/Blogs/:id"
            element={
              <Authenticator>
                <BlogInformation
                  setRefreshBlogs={setRefreshBlogs}
                  refreshBlogs={refreshBlogs}
                />
              </Authenticator>
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
