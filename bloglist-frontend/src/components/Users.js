import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"


const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  const users = []
  blogs.forEach((blog) => {
    if (!users.includes(blog.user.username)) {
      users.push(blog.user.username)
    }
  })

  const displayUsers = () => {
    return users.map((user) => {
      return (
        <tr key={user}>
          <td>
            <Link to={`/users/${user}`}>{user}</Link>
          </td>
          <td>
            {blogs.reduce(
              (total, curBlog) =>
                curBlog.user.username === user ? total + 1 : total,
              0
            )}
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h1>Users</h1>
      {users ? (
        <Table stripeed>
          <tbody>
            <tr>
              <th>Users</th>
              <th>blogs created</th>
            </tr>
            {displayUsers()}
          </tbody>
        </Table>
      ) : (
        <p>No Users</p>
      )}
    </div>
  )
}

export default Users
