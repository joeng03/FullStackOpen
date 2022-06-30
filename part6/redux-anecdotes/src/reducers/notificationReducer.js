import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let timeoutID;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const acSetNotification = (notification, duration) => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(
      () => dispatch(setNotification("")),
      duration * 1000
    );
  };
};
export default notificationSlice.reducer;
