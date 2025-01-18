export enum PasswordLength {
  MIN = 8,
}

export const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/);

export enum AuthError {
  ALREADY_EXISTS = 'User with this email already exists',
  NOT_FOUND = 'User not found',
  INVALID_EMAIL = 'The email is not valid',
  WRONG_CREDENTIALS = 'Wrong email or password',
  PASSWORD_TOO_SHORT = 'Password is  too short',
  INVALID_PASSWORD = 'Password has to contain at least 1 uppercase letter, 1 number and 1 special character',
}
