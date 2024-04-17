import { ThemeProvider } from "@mui/joy";

import WelcomePage from "./pages/WelcomePage";
function App() {
  return (
    <ThemeProvider>
      <WelcomePage />
    </ThemeProvider>
  );
}

export default App;
