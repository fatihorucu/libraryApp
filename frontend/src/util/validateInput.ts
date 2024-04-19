export function isNotEmpty(value: string) {
  return value.trim() !== "";
}

export function hasMinLength(value: string, minLength: number) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value: string, otherValue: string) {
  return value === otherValue;
}

export function isLength(value: string, length: number) {
  return value.length === length;
}
