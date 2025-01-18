import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { AuthError, passwordRegex } from '../../auth/auth.constants';

@ValidatorConstraint()
@Injectable()
export class IsPasswordStrongConstraint implements ValidatorConstraintInterface {

  validate(password: string) {
    console.log(password, passwordRegex.test(password));
    return typeof password === 'string' && passwordRegex.test(password);
  }

  defaultMessage(): string {
    return AuthError.INVALID_PASSWORD;
  }
}

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordStrongConstraint,
    });
  };
}
