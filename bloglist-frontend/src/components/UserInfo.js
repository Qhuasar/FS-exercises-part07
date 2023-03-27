import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const UserInfo = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const userBlogs = blogs.filter((blog) => blog.user.username === id)
  return (
    <div>
      <h1>{id}</h1>
      <p>Added Blogs</p>
      {!userBlogs ? (
        <p>User has not posted any blogs yet</p>
      ) : (
        userBlogs.map((blog) => {
          return (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          )
        })
      )}
    </div>
  )
}

export default UserInfo
