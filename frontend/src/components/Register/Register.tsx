import { Box, Stack, Typography, FormControl, FormLabel } from "@mui/joy";
import MyInput from "./styledComponents/StyledInput";
import PhoneInput from "./PhoneInput";

function Register() {
  return (
    <Box width="40%" component={"form"}>
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
            variant="outlined"
            placeholder="Surname"
            sx={{ width: "48%", flexGrow: 1 }}
          />
        </Stack>
        <FormControl sx={{ width: "100%" }}>
          <FormLabel>Birthday</FormLabel>
          <MyInput type="date" fullWidth />
        </FormControl>
        <MyInput placeholder="Student Number" fullWidth />
        <FormControl sx={{ width: "100%" }}>
          <PhoneInput size="lg" placeholder="Phone Number" />
        </FormControl>
        <MyInput type="password" placeholder="Password" fullWidth />
        <MyInput type="password" placeholder="Verify Your Password" fullWidth />
      </Stack>
    </Box>
  );
}

export default Register;
