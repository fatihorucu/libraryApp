import Table from "../components/Table";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchTableData } from "../store/table-actions";
import { fetchAuthenticatedUserData } from "../store/user-actions";
import NavBar from "../components/UI/NavBar";

function CurrentStatusPage() {
  const dispatch = useAppDispatch();
  const tableList = useAppSelector((state) => state.table.items);
  const authenticatedUser = useAppSelector(
    (state) => state.authenticatedUser.user
  );
  useEffect(() => {
    dispatch(fetchTableData());
    dispatch(fetchAuthenticatedUserData());
  }, [dispatch]);

  return (
    <>
      <NavBar authenticatedUser={authenticatedUser} />
      {tableList.length > 0 && authenticatedUser
        ? tableList.map((item) => {
            return <Table table={item} />;
          })
        : "User not authenticated"}
    </>
  );
}

export default CurrentStatusPage;
