import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationError } from './app.constants';

enum Port {
  MIN = 0,
  MAX = 65535
}

class EnvironmentConfig {
  @IsNumber({}, {
    message: EnvValidationError.INVALID_PORT
  })
  @Min(Port.MIN)
  @Max(Port.MAX)
  public PORT: number;

  @IsString({
    message: EnvValidationError.INVALID_JWT_AT_SECRET
  })
  public JWT_AT_SECRET: string;

  @IsNumber({}, {
    message: EnvValidationError.INVALID_JWT_AT_EXPIRES_IN
  })
  public JWT_AT_EXPIRES_IN: number;
}

export function validateEnvironment(config: EnvironmentConfig) {
  const envConfig = plainToInstance(EnvironmentConfig, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(envConfig, {
    skipMissingProperties: false
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return envConfig;
}
