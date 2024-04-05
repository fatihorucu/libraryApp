import * as React from "react";
import { IMaskInput } from "react-imask";
import { Input, type InputProps } from "@mui/joy";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskAdapter = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskAdapter(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default function PhoneInput(props: InputProps) {
  const [value, setValue] = React.useState("");
  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Placeholder"
      slotProps={{ input: { component: TextMaskAdapter } }}
      {...props}
    />
  );
}
