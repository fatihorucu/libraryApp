import { Stack, Typography, FormControl, Button } from "@mui/joy";
import MyInput from "./styledComponents/MyInput";
import PhoneInput from "./PhoneInput";
import { FormEvent, useRef } from "react";

interface RegisterProps {
  onBack: (buttonName: "register" | "login") => void;
}

function RegisterForm({ onBack }: RegisterProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const studentNumRef = useRef<HTMLInputElement>(null);
  const phoneNumRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(nameRef.current?.value);
  }

  return (
    <Stack component={"form"} onSubmit={handleSubmit}>
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
            ref={nameRef}
            name="name"
          />
          <MyInput
            placeholder="Surname"
            variant="outlined"
            sx={{ width: "48%", flexGrow: 1 }}
            size="md"
            name="surname"
            ref={surnameRef}
          />
        </Stack>
        <FormControl sx={{ width: "100%" }}>
          <MyInput
            type="text"
            fullWidth
            placeholder="Birthday"
            name="birthday"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            ref={birthdayRef}
          />
        </FormControl>
        <MyInput placeholder="Student Number" fullWidth ref={studentNumRef} />
        <FormControl sx={{ width: "100%" }}>
          <PhoneInput size="lg" name="phone" ref={phoneNumRef} />
        </FormControl>
        <MyInput
          placeholder="Password"
          fullWidth
          type="password"
          name="password"
          ref={passwordRef}
        />
        <Stack sx={{ width: "100%" }} gap={1} direction={"row"}>
          <Button fullWidth size="md" type="submit">
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
