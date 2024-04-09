import { Grid, Typography } from "@mui/joy";
import Seat from "./Seat";
import type { Table as TableModel } from "../models/table";

interface TableProps {
  table: TableModel;
}

function Table({ table }: TableProps) {
  const numberOfCols = table.numberOfChairs / table.numberOfRows;
  const numberOfChairsArray: number[] = [];

  for (let index = 0; index < table.numberOfChairs; index++) {
    numberOfChairsArray.push(index + 1);
  }
  return (
    <Grid
      container
      columns={numberOfCols}
      maxWidth={numberOfCols * 70}
      border={1}
      component={"fieldset"}
      p={1}
    >
      <Typography component={"legend"}>{table.category}</Typography>
      {numberOfChairsArray.map((item) => (
        <Grid xs={1}>
          <Seat tableNumber={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Table;
