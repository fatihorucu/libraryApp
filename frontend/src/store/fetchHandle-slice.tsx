import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ErrorObject {
  [x: string]: string;
}
interface fetchHandleState {
  isFetching: boolean;
  error: null | ErrorObject;
}

const initialFetchHandleState: fetchHandleState = {
  isFetching: false,
  error: null,
};

const fetchHandleSlice = createSlice({
  name: "fetchHandle",
  initialState: initialFetchHandleState,
  reducers: {
    setError(state, action: PayloadAction<ErrorObject | null>) {
      state.error = action.payload;
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
    deleteError(state, action: PayloadAction<string>) {
      if (state.error) {
        delete state.error[action.payload];
      }
    },
  },
});

export const fetchHandleActions = fetchHandleSlice.actions;
export default fetchHandleSlice;
