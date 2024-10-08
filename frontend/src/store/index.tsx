import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./table-slice";
import validationErrorSlice from "./validationError-slice";
import fetchHandleSlice from "./fetchHandle-slice";
import authenticatedUserSlice from "./user-slice";

const store = configureStore({
  reducer: {
    table: tableSlice.reducer,
    validationError: validationErrorSlice.reducer,
    fetchHandle: fetchHandleSlice.reducer,
    authenticatedUser: authenticatedUserSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
