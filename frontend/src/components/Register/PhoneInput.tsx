import * as React from "react";
import { IMaskInput } from "react-imask";
import { Input, type InputProps } from "@mui/joy";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskAdapter(props, inputRef) {
    const { onChange, ...other } = props;
    const ref = React.createRef();
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={inputRef}
        ref={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

function PhoneInput(props: InputProps) {
  const [value, setValue] = React.useState("");
  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Phone Number"
      slotProps={{ input: { component: TextMaskAdapter } }}
      {...props}
    />
  );
}

export default PhoneInput;
