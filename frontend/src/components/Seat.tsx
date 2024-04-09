import ChairAltIcon from "@mui/icons-material/ChairAlt";
import { Typography } from "@mui/joy";
import { Box } from "@mui/joy";
interface SeatProps {
  tableNumber: number;
}
function Seat({ tableNumber }: SeatProps) {
  return (
    <Box
      component="button"
      display="flex"
      alignItems="start"
      flexDirection="column"
      sx={{
        backgroundColor: "white",
        color: "black",
        border: 0,
        ":hover": { backgroundColor: "neutral.100" },
        borderRadius: "3px",
      }}
    >
      <Box display={"grid"} margin={"auto"}>
        <ChairAltIcon
          sx={{
            color: "grey",
            fontSize: 30,
            opacity: 0.35,
            gridRow: 1,
            gridColumn: 1,
          }}
        />
        <Typography sx={{ gridRow: 1, gridColumn: 1 }}>
          {tableNumber}
        </Typography>
      </Box>
      <Typography level="body-xs">S: 16.30</Typography>
      <Typography level="body-xs">E: 19.30</Typography>
    </Box>
  );
}

export default Seat;
