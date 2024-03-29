import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
  },
});
export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
