import { useRef } from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const BlogList = ({ setRefreshBlogs, handleChange, refreshBlogs }) => {
  const refBlogForm = useRef()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            refreshBlogs={refreshBlogs}
            setRefreshBlogs={setRefreshBlogs}
          />
        ))}
      </div>
      <Togglable ref={refBlogForm} info="new blog">
        <BlogForm
          handleChange={handleChange}
          user={user}
          refreshBlogs={refreshBlogs}
          setRefreshBlogs={setRefreshBlogs}
          ref={refBlogForm}
        />
      </Togglable>
    </div>
  )
}

export default BlogList
