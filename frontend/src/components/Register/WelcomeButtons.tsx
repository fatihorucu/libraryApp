import { Button, Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function WelcomeButtons() {
  const navigate = useNavigate();
  function handleClick(clickedButton: "login" | "register") {
    navigate("/auth/" + clickedButton);
  }
  return (
    <Stack gap={2}>
      <Button size="lg" onClick={() => handleClick("login")}>
        Login
      </Button>
      <Button size="lg" onClick={() => handleClick("register")}>
        Register
      </Button>
    </Stack>
  );
}

export default WelcomeButtons;
