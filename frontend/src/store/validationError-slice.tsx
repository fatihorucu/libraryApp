import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  password: { error: string | null };
  studentNum: { error: string | null };
  name: { error: string | null };
  surname: { error: string | null };
}

interface PayloadType {
  field: "password" | "studentNum" | "name" | "surname";
  error: string | null;
}

const initialErrorState: ErrorState = {
  password: { error: null },
  studentNum: { error: null },
  name: { error: null },
  surname: { error: null },
};

const validationErrorSlice = createSlice({
  name: "validationError",
  initialState: initialErrorState,
  reducers: {
    setError(state, action: PayloadAction<PayloadType>) {
      state = { ...state, [action.payload.field]: action.payload.error };
    },
  },
});

export const tableActions = validationErrorSlice.actions;
export default validationErrorSlice;
