import { IsEmail, MinLength } from 'class-validator';
import { AuthError, PasswordLength } from '../auth.constants';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(PasswordLength.MIN, {
    message: AuthError.PASSWORD_TOO_SHORT
  })
  password: string;
}
