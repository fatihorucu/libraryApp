import { Input, type InputProps } from "@mui/joy";
import { forwardRef } from "react";

type Ref = HTMLInputElement;
const MyInput = forwardRef<Ref, InputProps>(function MyInput(
  { size, ...props },
  ref
) {
  if (size) {
    return <Input {...props} size={size} slotProps={{ input: { ref: ref } }} />;
  }
  return <Input {...props} size="lg" slotProps={{ input: { ref: ref } }} />;
});

export default MyInput;
