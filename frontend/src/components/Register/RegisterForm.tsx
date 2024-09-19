import {
  Stack,
  Typography,
  FormControl,
  Button,
  FormHelperText,
} from "@mui/joy";
import MyInput from "./styledComponents/MyInput";
import { FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { validationErrorActions } from "../../store/validationError-slice";
import { cleanPhoneNumber } from "../../util/cleanInput";
import * as ValidateInput from "../../util/validateInput";
import MaskedInput from "./MaskedInput";
import { type PayloadType } from "../../store/validationError-slice";
import { fetchHandleActions } from "../../store/fetchHandle-slice";
import * as Http from "../../http.ts";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validationError = useAppSelector((state) => state.validationError);
  const { error: fetchError } = useAppSelector((state) => state.fetchHandle);

  const {
    password: vPassword,
    surname: vSurname,
    birthday: vBirthday,
    name: vName,
    phoneNum: vPhone,
    studentNum: vStudentNum,
    passwordMatch: vPasswordMatch,
  } = validationError;

  // const { error: fetchError, isFetching } = fetchHandle;

  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const studentNumRef = useRef<HTMLInputElement>(null);
  const phoneNumRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const phoneNum = cleanPhoneNumber(phoneNumRef.current!.value);
    const birthday = birthdayRef.current!.value;
    const password = passwordRef.current!.value;
    const password2 = passwordRef2.current!.value;
    const studentNum = studentNumRef.current!.value;
    const name = nameRef.current!.value;
    const surname = surnameRef.current!.value;

    const isNameValid = ValidateInput.isNotEmpty(name!);
    const isSurnameValid = ValidateInput.isNotEmpty(surname!);
    const isPasswordValid = ValidateInput.hasMinLength(password!, 8);
    const passwordMatch = ValidateInput.isEqualsToOtherValue(
      password,
      password2
    );
    const isPhoneNumberValid =
      phoneNum && ValidateInput.isLength(phoneNum!, 10);

    const isStudentNumValid = ValidateInput.isLength(studentNum!, 10);
    const isBirthdayValid = ValidateInput.isLength(birthday!, 10);

    if (!isNameValid) {
      dispatch(
        validationErrorActions.setError({
          field: "name",
          error: "Name can't be empty",
        })
      );
    }
    if (!isSurnameValid) {
      dispatch(
        validationErrorActions.setError({
          field: "surname",
          error: "Surname can't be empty",
        })
      );
    }
    if (!isPasswordValid) {
      dispatch(
        validationErrorActions.setError({
          field: "password",
          error: "Password must be at least 8 character",
        })
      );
    }
    if (!passwordMatch) {
      dispatch(
        validationErrorActions.setError({
          field: "passwordMatch",
          error: "Passwords should match",
        })
      );
    }
    if (!isStudentNumValid) {
      dispatch(
        validationErrorActions.setError({
          field: "studentNum",
          error: "Student Number must be 10 digits",
        })
      );
    }
    if (phoneNum.length > 0 && !isPhoneNumberValid) {
      dispatch(
        validationErrorActions.setError({
          field: "phoneNum",
          error: "Phone number must be 10 digits",
        })
      );
    }
    if (!isBirthdayValid) {
      dispatch(
        validationErrorActions.setError({
          field: "birthday",
          error: "Please choose a valid date",
        })
      );
    }
    if (
      vName.error ||
      vSurname.error ||
      vPassword.error ||
      vPasswordMatch.error ||
      vPhone.error ||
      vStudentNum.error ||
      vBirthday.error
    ) {
      return;
    } else {
      async function sendRegisterRequest() {
        dispatch(fetchHandleActions.setIsFetching(true));
        const response = await Http.createUser({
          name,
          surname,
          studentNum,
          birthday,
          phoneNum,
          password,
        });
        dispatch(fetchHandleActions.setIsFetching(false));
        if (!response.ok) {
          const { error } = await response.json();
          dispatch(fetchHandleActions.setError(error));
        }
      }
      sendRegisterRequest();
    }
  }
  type HandleFocusFunction = ({ field, error }: PayloadType) => void;

  const handleFocus: HandleFocusFunction = ({ field, error }) => {
    dispatch(validationErrorActions.setError({ field, error }));
    dispatch(fetchHandleActions.deleteError(field));
  };

  function handleBack() {
    dispatch(validationErrorActions.resetError());
    dispatch(fetchHandleActions.setError(null));
    navigate("/auth");
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
          <FormControl
            sx={{ width: "48%", flexGrow: 1 }}
            error={vName.error || fetchError?.name ? true : false}
          >
            <MyInput
              placeholder="Name"
              variant="outlined"
              ref={nameRef}
              name="name"
              defaultValue={""}
              onFocus={() => handleFocus({ field: "name", error: "" })}
            />

            {vName.error && <FormHelperText>{vName.error}</FormHelperText>}
            {<FormHelperText>{fetchError?.name}</FormHelperText>}
          </FormControl>
          <FormControl
            sx={{ width: "48%", flexGrow: 1 }}
            error={vSurname.error || fetchError?.surname ? true : false}
          >
            <MyInput
              placeholder="Surname"
              variant="outlined"
              size="lg"
              name="surname"
              ref={surnameRef}
              defaultValue={""}
              onFocus={() => handleFocus({ field: "surname", error: "" })}
            />
            {vSurname.error && (
              <FormHelperText>{vSurname.error}</FormHelperText>
            )}
            {<FormHelperText>{fetchError?.surname}</FormHelperText>}
          </FormControl>
        </Stack>
        <FormControl
          sx={{ width: "100%" }}
          error={vBirthday.error || fetchError?.birthday ? true : false}
        >
          <MyInput
            type="text"
            fullWidth
            placeholder="Birthday"
            name="birthday"
            onFocus={(e) => {
              handleFocus({ field: "birthday", error: "" });
              return (e.target.type = "date");
            }}
            ref={birthdayRef}
            defaultValue={""}
          />
          {vBirthday.error && (
            <FormHelperText>{vBirthday.error}</FormHelperText>
          )}
          {<FormHelperText>{fetchError?.birthday}</FormHelperText>}
        </FormControl>
        <FormControl
          sx={{ width: "100%" }}
          error={vStudentNum.error || fetchError?.studentNum ? true : false}
        >
          <MaskedInput
            ref={studentNumRef}
            name="studentNum"
            size="lg"
            onFocus={() => handleFocus({ field: "studentNum", error: "" })}
          />
          {vStudentNum.error && (
            <FormHelperText>{vStudentNum.error}</FormHelperText>
          )}
        </FormControl>
        {<FormHelperText>{fetchError?.studentNum}</FormHelperText>}
        <FormControl sx={{ width: "100%" }} error={vPhone.error ? true : false}>
          <MaskedInput
            size="lg"
            name="phoneNum"
            ref={phoneNumRef}
            defaultValue={""}
            onFocus={() => handleFocus({ field: "phoneNum", error: "" })}
          />
          {vPhone.error && <FormHelperText>{vPhone.error}</FormHelperText>}
        </FormControl>
        <FormControl
          sx={{ width: "100%" }}
          error={
            vPassword.error || vPasswordMatch.error || fetchError?.password
              ? true
              : false
          }
        >
          <MyInput
            placeholder="Password"
            type="password"
            name="password"
            ref={passwordRef}
            defaultValue={""}
            onFocus={() => {
              handleFocus({ field: "password", error: "" });
              handleFocus({ field: "passwordMatch", error: "" });
            }}
          />
          {vPassword.error ? (
            <FormHelperText>{vPassword.error}</FormHelperText>
          ) : vPasswordMatch.error ? (
            <FormHelperText>{vPasswordMatch.error}</FormHelperText>
          ) : undefined}
          {<FormHelperText>{fetchError?.password}</FormHelperText>}
        </FormControl>
        <FormControl
          sx={{ width: "100%" }}
          error={vPasswordMatch.error ? true : false}
        >
          <MyInput
            placeholder="Validate Password"
            type="password"
            name="password2"
            ref={passwordRef2}
            defaultValue={""}
            onFocus={() => handleFocus({ field: "passwordMatch", error: "" })}
          />
          {vPasswordMatch.error && (
            <FormHelperText>{vPasswordMatch.error}</FormHelperText>
          )}
        </FormControl>

        <Stack sx={{ width: "100%" }} gap={1} direction={"row"}>
          <Button fullWidth size="md" type="submit">
            Register
          </Button>
          <Button fullWidth size="md" variant="outlined" onClick={handleBack}>
            Back
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RegisterForm;
