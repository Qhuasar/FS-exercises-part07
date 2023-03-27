import { createSlice } from "@reduxjs/toolkit"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action){
      return state.concat(action.payload)
    }
  },
})

export default blogsSlice.reducer

export const { setBlogs, addBlog } = blogsSlice.actions
