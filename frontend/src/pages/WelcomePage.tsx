import { AspectRatio, Box, Button, Stack } from "@mui/joy";
import UniImg from "../assets/university_img2.jpg";
import RegisterForm from "../components/Register/RegisterForm";
import LoginForm from "../components/Register/LoginForm";
import { useState } from "react";

interface IsClicked {
  register: boolean;
  login: boolean;
}
function WelcomePage() {
  const [isClicked, setIsClicked] = useState<IsClicked>({
    register: false,
    login: false,
  });

  function handleClick(buttonName: "login" | "register") {
    setIsClicked((prevValue) => {
      return { ...prevValue, [buttonName]: !prevValue[buttonName] };
    });
  }
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} gap={10}>
        <Box width={"55%"}>
          <AspectRatio
            ratio={1}
            objectFit="cover"
            minHeight={768}
            sx={{ borderRadius: "sm" }}
          >
            <img src={UniImg} alt="Bogazici University" />
          </AspectRatio>
        </Box>
        <Box width={"35%"}>
          {!isClicked.login && !isClicked.register && (
            <Stack gap={2}>
              <Button size="lg" onClick={() => handleClick("login")}>
                Login
              </Button>
              <Button size="lg" onClick={() => handleClick("register")}>
                Register
              </Button>
            </Stack>
          )}
          {isClicked.login && <LoginForm onBack={handleClick} />}
          {isClicked.register && <RegisterForm onBack={handleClick} />}
        </Box>
      </Stack>
    </>
  );
}

export default WelcomePage;
