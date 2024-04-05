import { tableActions } from "./table-slice";
import { type Dispatch } from "@reduxjs/toolkit";

export function fetchTableData() {
  return async (dispatch: Dispatch) => {
    async function fetchData() {
      const response = await fetch("localhost:4000/api/tables");

      if (!response.ok) {
        throw new Error("Couldn't fetch tables data");
      }

      const data = await response.json();

      return data;
    }

    try {
      const tableData = await fetchData();
      if (tableData) {
        dispatch(tableActions.setTables(tableData));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
