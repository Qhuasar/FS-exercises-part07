import axios from "axios"
const baseUrl = "/api/blogs"

let token = ""

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createBlog = async (data) => {
  try {
    const respnse = await axios.post(baseUrl, data, {
      headers: {
        Authorization: token,
      },
    })
    return respnse.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const updateBlogLikes = async (id) => {
  try {
    const respnse = await axios.put(
      `${baseUrl}/${id}/likes`,
      { likes: 1 },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    return respnse.data
  } catch (error) {
    throw new Error(error.response)
  }
}

const addComment = async (id, comment) => {
  try {
    const respnse = await axios.put(
      `${baseUrl}/${id}/comments`,
      { comment: comment },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    return respnse.data
  } catch (error) {
    throw new Error(error.response)
  }
}

const deleteBlog = async (id) => {
  try {
    const respnse = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    return respnse.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}
export default {
  getAll,
  createBlog,
  setToken,
  updateBlogLikes,
  deleteBlog,
  addComment,
}
