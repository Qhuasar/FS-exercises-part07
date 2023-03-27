import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import blogServices from "../services/blogs"

const CommentList = (props) => {
  return (
    <div>
      {props.comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.comment} |||| {comment.user.username}
          </div>
        )
      })}
    </div>
  )
}

const CommentForm = (props) => {
  const [comment, setComment] = useState("")

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await blogServices.addComment(props.id, comment)
      props.setRefreshBlogs(props.refreshBlogs + 1)
      setComment("")
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <form onSubmit={(e) => handleCreate(e)}>
      <label>comment</label>
      <input
        id={"comment-inpt"}
        value={comment}
        onChange={(e) => handleChange(e, setComment, comment)}
      />
      <button  id="create-comment-btn" type="submit">
        send
      </button>
    </form>
  )
}

const Comments = ({ id, refreshBlogs, setRefreshBlogs }) => {
  const [comments, setComments] = useState([])
  const [blog, setBlog] = useState(null)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    if (blogs) {
      setBlog(blogs.find((blog) => blog.id === id))
    }
  }, [blogs])

  useEffect(() => {
    if (blog) {
      setComments(blog.comments.map((comment) => comment))
    }
  }, [blog])

  if (!blog)
    return (
      <div>
        <p> no comments yet</p>
        <CommentForm id={id} />
      </div>
    )

  return (
    <div>
      <CommentList comments={comments} />
      <CommentForm
        id={id}
        comments={comments}
        setComments={setComments}
        refreshBlogs={refreshBlogs}
        setRefreshBlogs={setRefreshBlogs}
      />
    </div>
  )
}

export default Comments
