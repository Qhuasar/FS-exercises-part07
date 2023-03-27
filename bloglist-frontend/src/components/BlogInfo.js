import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeNotification } from "../reducers/notificationReducer"
import blogServices from "../services/blogs"

const BlogInfo = ({
  blog: { url, likes, user, title, id },
  setRefreshBlogs,
  refreshBlogs,
}) => {
  const dispatch = useDispatch()
  const [updatedLikes, setUpdatedLikes] = useState(null)
  useEffect(() => setUpdatedLikes(likes), [likes])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLike = async () => {
    try {
      setUpdatedLikes(updatedLikes + 1)
      await blogServices.updateBlogLikes(id, likes)
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = async () => {
    try {
      await blogServices.deleteBlog(id)
      dispatch(changeNotification(`Sucessfuly removed ${title}`))
      setRefreshBlogs(refreshBlogs + 1)
    } catch (error) {
      dispatch(changeNotification(error.message))
    }
  }
  const displayBlogInfo = () => {
    return (
      <div style={blogStyle}>
        <p>{url}</p>
        {updatedLikes === null ? likes : updatedLikes}
        <button onClick={handleLike} type="button">
          like
        </button>
        <p>{user.name}</p>
        <button onClick={removeBlog} type="button">
          remove
        </button>
      </div>
    )
  }

  return <div>{title !== null && displayBlogInfo()}</div>
}

BlogInfo.displayName = "BlogInfo"
export default BlogInfo
