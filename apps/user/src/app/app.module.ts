import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@albert-ambaryan/models';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from '../app.constants';
import { validateEnvironment } from '../app.env-validation';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_FILE_PATH],
      cache: true,
      validate: validateEnvironment,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
