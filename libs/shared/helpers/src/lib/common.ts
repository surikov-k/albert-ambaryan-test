import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { type ClassValue, clsx } from 'clsx';
import { jwtDecode } from 'jwt-decode';

import { twMerge } from 'tailwind-merge';

export const AUTH_API_URL = 'http://localhost:3333/api/auth';
export const CAPTCHA_API_URL = 'http://localhost:3333/api/captcha';

export function prepareDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function prepareDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function prepareDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeEmailFromJWT(token: string): { email: string } {
  try {
    return jwtDecode<{ email: string }>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return { email: '' };
  }
}
