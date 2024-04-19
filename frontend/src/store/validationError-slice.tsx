import { createSlice, type PayloadAction, current } from "@reduxjs/toolkit";

interface ErrorState {
  password: { error: string | null };
  studentNum: { error: string | null };
  name: { error: string | null };
  surname: { error: string | null };
  phoneNum: { error: string | null };
  birthday: { error: string | null };
  passwordMatch: { error: string | null };
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
  error: string | null;
}

const initialErrorState: ErrorState = {
  password: { error: null },
  studentNum: { error: null },
  name: { error: null },
  surname: { error: null },
  phoneNum: { error: null },
  birthday: { error: null },
  passwordMatch: { error: null },
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
  },
});

export const validationErrorActions = validationErrorSlice.actions;
export default validationErrorSlice;
