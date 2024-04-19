import * as React from "react";
import { IMaskInput } from "react-imask";
import { Input, type InputProps } from "@mui/joy";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskAdapter(props, inputRef) {
    const { onChange, name, ...other } = props;
    const phoneNumMask = "(#00) 000-0000";
    const studentNumMask = "0000000000";
    const ref = React.createRef();
    return (
      <IMaskInput
        {...other}
        mask={name === "phoneNum" ? phoneNumMask : studentNumMask}
        definitions={{
          "#": /[1-9]/,
        }}
        unmask={"typed"}
        inputRef={inputRef}
        ref={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value: value } })
        }
        overwrite
      />
    );
  }
);

const MaskedInput = React.forwardRef<HTMLInputElement, InputProps>(
  function PhoneInput(props, ref) {
    const [value, setValue] = React.useState("");
    return (
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={
          props.name === "phoneNum" ? "Phone Number" : "Student Number"
        }
        slotProps={{ input: { component: TextMaskAdapter, ref: ref } }}
        {...props}
      />
    );
  }
);

export default MaskedInput;
