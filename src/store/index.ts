import { configureStore } from "@reduxjs/toolkit";
import AlertConfirmDialogSlice from "./reducers/AlertConfirmDialogSlice";
import AuthuserSlice from "./reducers/AuthuserSlice";

const store = configureStore({
  reducer: {
    authuser: AuthuserSlice,
    alertConfirm: AlertConfirmDialogSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
