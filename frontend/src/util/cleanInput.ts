export function cleanPhoneNumber(phoneNumber: string) {
  // Remove parentheses, spaces, and dashes
  return phoneNumber?.replace(/[\s()-]/g, "");
}
