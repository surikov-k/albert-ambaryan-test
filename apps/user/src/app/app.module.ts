import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@albert-ambaryan/models';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from '../app.constants';
import { validateEnvironment } from '../app.env-validation';
import { AuthModule } from './auth/auth.module';
import { jwtOptions } from './config';
import { UserModule } from './user/user.module';
import { CaptchaModule } from './captcha/captcha.module';

@Module({
  imports: [
    PrismaClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH],
      load: [jwtOptions],
      cache: true,
      validate: validateEnvironment,
    }),
    AuthModule,
    UserModule,
    CaptchaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
