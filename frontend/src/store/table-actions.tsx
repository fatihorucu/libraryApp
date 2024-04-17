import { tableActions } from "./table-slice";
import { Table } from "../models/table";
import { Dispatch } from "@reduxjs/toolkit";

export function fetchTableData() {
  return async (dispatch: Dispatch) => {
    async function fetchData(): Promise<Table[]> {
      const response = await fetch("/api/tables", {
        method: "GET",
      });

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
