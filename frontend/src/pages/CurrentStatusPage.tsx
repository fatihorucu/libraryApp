import Table from "../components/Table";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchTableData } from "../store/table-actions";

function CurrentStatusPage() {
  const dispatch = useAppDispatch();
  const tableList = useAppSelector((state) => state.table.items);
  useEffect(() => {
    console.log("in here");
    dispatch(fetchTableData());
  }, [dispatch]);

  return (
    <>
      {tableList.length > 0
        ? tableList.map((item) => {
            return <Table table={item} />;
          })
        : undefined}
    </>
  );
}

export default CurrentStatusPage;
