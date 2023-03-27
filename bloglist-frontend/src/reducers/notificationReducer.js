import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})
export default notificationSlice.reducer

export const { setNotification, removeNotification } = notificationSlice.actions

export const changeNotification = (notification, time = 5) => {
  return (dispatch) => {
    dispatch(setNotification(notification))
    setInterval(() => dispatch(removeNotification()), time * 1000)
  }
}
