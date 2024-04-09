import { Box, Stack, Typography, Button } from "@mui/joy";
import MyInput from "./styledComponents/StyledInput";
interface LoginProps {
  onBack: (buttonName: "register" | "login") => void;
}
function LoginForm({ onBack }: LoginProps) {
  return (
    <Box component={"form"}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems={"start"}
        spacing={2}
        sx={{ flexWrap: "wrap" }}
        useFlexGap
      >
        <Typography level="h3">Login</Typography>
        <MyInput placeholder="Student Number" fullWidth />
        <MyInput type="password" placeholder="Password" fullWidth />
        <Stack sx={{ width: "100%" }} gap={1} direction={"row"}>
          <Button fullWidth size="md">
            Register
          </Button>
          <Button
            fullWidth
            size="md"
            variant="outlined"
            onClick={() => onBack("login")}
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default LoginForm;
