import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
