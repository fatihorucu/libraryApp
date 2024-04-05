import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Table {
  _id: string;
  category: string;
  numberOfChairs: number;
  numberOfRows: number;
}

interface TableState {
  items: Table[];
}

const initialTableState: TableState = {
  items: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState: initialTableState,
  reducers: {
    setTables(state, action: PayloadAction<Table[]>) {
      state.items = action.payload;
    },
  },
});

export const tableActions = tableSlice.actions;
export default tableSlice;
