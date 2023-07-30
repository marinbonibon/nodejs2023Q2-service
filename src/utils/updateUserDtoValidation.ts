export const isValidUpdateUserDto = (
  oldPassword: string,
  newPassword: string,
): boolean => {
  return !!oldPassword && !!newPassword;
};
