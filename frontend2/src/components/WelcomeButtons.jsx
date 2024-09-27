import { useNavigate } from "react-router-dom";
import Button from "./Button";
function WelcomeButtons() {
  const navigate = useNavigate();
  function handleClick(clickedButton) {
    navigate("/auth/" + clickedButton);
  }
  return (
    <>
      <Button onClick={() => handleClick("login")} className={"w-5/6"}>
        Login
      </Button>
      <Button onClick={() => handleClick("register")} className={"w-5/6"}>
        Register
      </Button>
    </>
  );
}

export default WelcomeButtons;
