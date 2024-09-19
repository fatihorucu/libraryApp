import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/joy";
import MaskedInput from "./MaskedInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MyInput from "./styledComponents/MyInput";
import { useNavigate } from "react-router-dom";
import { fetchHandleActions } from "../../store/fetchHandle-slice";
import * as Http from "../../http";
import { FormEvent, useRef } from "react";
function LoginForm() {
  const navigate = useNavigate();
  const { error: fetchError } = useAppSelector((state) => state.fetchHandle);
  const dispatch = useAppDispatch();

  const passwordRef = useRef<HTMLInputElement>(null);
  const studentNumRef = useRef<HTMLInputElement>(null);
  function handleBack() {
    navigate("/auth");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const password = passwordRef.current!.value;
    const studentNum = studentNumRef.current!.value;
    async function sendLoginRequest() {
      dispatch(fetchHandleActions.setIsFetching(true));
      const response = await Http.login({
        studentNum,
        password,
      });
      dispatch(fetchHandleActions.setIsFetching(false));

      if (!response.ok) {
        const { error } = await response.json();
        console.log(error);
        dispatch(fetchHandleActions.setError(error));
      } else {
        navigate("/");
      }
    }
    sendLoginRequest();
  }

  type HandleFocusFunction = (field: "loginErr") => void;

  const handleFocus: HandleFocusFunction = (field) => {
    dispatch(fetchHandleActions.deleteError(field));
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems={"start"}
        spacing={2}
        sx={{ flexWrap: "wrap" }}
        useFlexGap
      >
        <Typography level="h3">Login</Typography>
        <FormControl
          sx={{ width: "100%" }}
          error={fetchError?.loginErr ? true : false}
        >
          <MaskedInput
            ref={studentNumRef}
            name="studentNum"
            size="lg"
            onFocus={() => handleFocus("loginErr")}
          />
        </FormControl>
        <FormControl
          sx={{ width: "100%" }}
          error={fetchError?.loginErr ? true : false}
        >
          <MyInput
            placeholder="Password"
            type="password"
            name="password"
            ref={passwordRef}
            defaultValue={""}
            onFocus={() => {
              handleFocus("loginErr");
            }}
          />
          {<FormHelperText>{fetchError?.loginErr}</FormHelperText>}
        </FormControl>
        <Stack sx={{ width: "100%" }} gap={1} direction={"row"}>
          <Button fullWidth size="md" type="submit">
            Login
          </Button>
          <Button fullWidth size="md" variant="outlined" onClick={handleBack}>
            Back
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default LoginForm;
