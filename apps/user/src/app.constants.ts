export const ENV_FILE_PATH = 'env/.user.env';

export enum EnvValidationError {
  INVALID_PORT = 'PORT must be a number',
  INVALID_JWT_AT_SECRET = 'JWT_AT_SECRET must be a string',
  INVALID_JWT_AT_EXPIRES_IN = 'JWT_AT_EXPIRES_IN must be a number'
}
