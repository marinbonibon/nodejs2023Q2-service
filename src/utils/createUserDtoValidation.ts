export const isValidCreateUserDto = (
  login: string,
  password: string,
): boolean => {
  return !!login && !!password;
};
