import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthenticatedUser } from "../models/authenticatedUser";

interface AuthenticatedUserState {
  user: AuthenticatedUser | null;
}

const initialAuthenticatedUserState: AuthenticatedUserState = {
  user: null,
};

const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState: initialAuthenticatedUserState,
  reducers: {
    setAuthenticatedUser(state, action: PayloadAction<AuthenticatedUser>) {
      state.user = action.payload;
    },
  },
});

export const authenticatedUserActions = authenticatedUserSlice.actions;
export default authenticatedUserSlice;
