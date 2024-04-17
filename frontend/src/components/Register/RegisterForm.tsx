import { Stack, Typography, FormControl, Button } from "@mui/joy";
import MyInput from "./styledComponents/StyledInput";
import PhoneInput from "./PhoneInput";

interface RegisterProps {
  onBack: (buttonName: "register" | "login") => void;
}

function RegisterForm({ onBack }: RegisterProps) {
  return (
    <Stack component={"form"}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems={"start"}
        spacing={2}
        sx={{ flexWrap: "wrap" }}
        useFlexGap
      >
        <Typography level="h3">Register</Typography>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", width: "100%" }}
        >
          <MyInput
            placeholder="Name"
            variant="outlined"
            sx={{ width: "48%", flexGrow: 1 }}
          />
          <MyInput
            placeholder="Surname"
            variant="outlined"
            sx={{ width: "48%", flexGrow: 1 }}
            size="md"
          />
        </Stack>
        <FormControl sx={{ width: "100%" }}>
          <MyInput
            type="text"
            fullWidth
            placeholder="Birthday"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </FormControl>
        <MyInput placeholder="Student Number" fullWidth />
        <FormControl sx={{ width: "100%" }}>
          <PhoneInput size="lg" />
        </FormControl>
        <MyInput placeholder="Password" fullWidth type="password" />
        <Stack sx={{ width: "100%" }} gap={1} direction={"row"}>
          <Button fullWidth size="md">
            Register
          </Button>
          <Button
            fullWidth
            size="md"
            variant="outlined"
            onClick={() => onBack("register")}
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RegisterForm;
