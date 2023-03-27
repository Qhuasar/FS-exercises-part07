import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeNotification } from "../reducers/notificationReducer"
import blogServices from "../services/blogs"
import Comments from "./Comments"

const BlogInformation = ({ refreshBlogs, setRefreshBlogs }) => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const [updatedLikes, setUpdatedLikes] = useState(null)
  useEffect(() => {
    if (blog) setUpdatedLikes(blog.likes)
  }, [blog])

  useEffect(() => {
    if (blogs) {
      setBlog(blogs.find((blog) => blog.id === id))
    }
  }, [blogs])

  const handleLike = async () => {
    try {
      setUpdatedLikes(updatedLikes + 1)
      await blogServices.updateBlogLikes(id, blog.likes)
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = async () => {
    try {
      await blogServices.deleteBlog(id)
      dispatch(changeNotification(`Sucessfuly removed ${blog.title}`))
      navigate("/")
      setRefreshBlogs(refreshBlogs + 1)
    } catch (error) {
      dispatch(changeNotification(error.message))
    }
  }
  const displayBlogInfo = () => {
    return (
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.url}</p>
        {updatedLikes === null ? blog.likes : updatedLikes}
        <button onClick={handleLike} type="button">
          like
        </button>
        <p>{blog.user.name}</p>
        <Comments
          id={blog.id}
          refreshBlogs={refreshBlogs}
          setRefreshBlogs={setRefreshBlogs}
        />
        <button onClick={removeBlog} type="button">
          remove
        </button>
      </div>
    )
  }

  return <div>{blog && displayBlogInfo()}</div>
}

BlogInformation.displayName = "BlogInformation"
export default BlogInformation
