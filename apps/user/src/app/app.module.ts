import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@albert-ambaryan/models';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, AuthModule, PrismaClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
