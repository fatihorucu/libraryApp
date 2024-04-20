import { createSlice, type PayloadAction, current } from "@reduxjs/toolkit";

interface ErrorState {
  password: { error: string };
  studentNum: { error: string };
  name: { error: string };
  surname: { error: string };
  phoneNum: { error: string };
  birthday: { error: string };
  passwordMatch: { error: string };
}

export interface PayloadType {
  field:
    | "password"
    | "studentNum"
    | "name"
    | "surname"
    | "phoneNum"
    | "birthday"
    | "passwordMatch";
  error: string;
}

export const initialErrorState: ErrorState = {
  password: { error: "" },
  studentNum: { error: "" },
  name: { error: "" },
  surname: { error: "" },
  phoneNum: { error: "" },
  birthday: { error: "" },
  passwordMatch: { error: "" },
};

const validationErrorSlice = createSlice({
  name: "validationError",
  initialState: initialErrorState,
  reducers: {
    setError(state, action: PayloadAction<PayloadType>) {
      const { field, error } = action.payload;
      state[field].error = error;
      console.log(current(state));
    },
    resetError(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.birthday.error = "";
      state.name.error = "";
      state.surname.error = "";
      state.password.error = "";
      state.passwordMatch.error = "";
      state.phoneNum.error = "";
      state.studentNum.error = "";
    },
  },
});

export const validationErrorActions = validationErrorSlice.actions;
export default validationErrorSlice;
