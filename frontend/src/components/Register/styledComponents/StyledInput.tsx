import { Input, styled, type InputProps } from "@mui/joy";

const StyledInput = styled(Input)<InputProps>(() => ({}));

function MyInput({ size, ...props }: InputProps) {
  if (size) {
    return <StyledInput {...props} size={size} />;
  }
  return <StyledInput {...props} size="lg" />;
}

export default MyInput;
