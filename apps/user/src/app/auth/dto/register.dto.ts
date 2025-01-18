import { IsEmail, MinLength } from 'class-validator';
import { IsEmailUnique, IsPasswordStrong } from '../../common/validators';
import { AuthError, PasswordLength } from '../auth.constants';

export class RegisterDto {
  @IsEmail({},{message: AuthError.INVALID_EMAIL})
  @IsEmailUnique({message: AuthError.ALREADY_EXISTS})
  email: string;

  @MinLength(PasswordLength.MIN, {message: AuthError.PASSWORD_TOO_SHORT})
  @IsPasswordStrong({message: AuthError.INVALID_PASSWORD})
  password: string;
}
