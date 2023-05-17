/**
 * Checks if a password is valid.
 * @param password - The password to validate.
 * @returns A boolean indicating whether the password is valid.
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};
