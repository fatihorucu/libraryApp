import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./table-slice";

const store = configureStore({
  reducer: { table: tableSlice.reducer },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
