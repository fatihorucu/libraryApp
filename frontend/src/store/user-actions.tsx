import { authenticatedUserActions } from "./user-slice";
import { AuthenticatedUser } from "../models/authenticatedUser";
import { Dispatch } from "@reduxjs/toolkit";
import { getCurrentUser } from "../http";

export function fetchAuthenticatedUserData() {
  return async (dispatch: Dispatch) => {
    async function fetchData(): Promise<AuthenticatedUser> {
      const response = await getCurrentUser();

      if (!response.ok) {
        throw new Error("Couldn't fetch authenticated user data");
      }

      const data = await response.json();

      return data;
    }

    try {
      const authenticatedUserData = await fetchData();
      if (authenticatedUserData) {
        dispatch(
          authenticatedUserActions.setAuthenticatedUser(authenticatedUserData)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
}
