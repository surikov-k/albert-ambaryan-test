import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@albert-ambaryan/models';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from '../app.constants';
import { validateEnvironment } from '../app.env-validation';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, AuthModule, PrismaClientModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [ENV_FILE_PATH],
    cache: true,
    validate: validateEnvironment
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
