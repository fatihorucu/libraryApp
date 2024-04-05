import { ThemeProvider } from "@mui/joy";
import Seats from "./components/Seat";
function App() {
  return (
    <>
      <ThemeProvider>
        <Seats />
      </ThemeProvider>
    </>
  );
}

export default App;
