import { JwtPayload } from '@albert-ambaryan/types';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { prepareDto } from '@albert-ambaryan/helpers';
import { GetUserPayload } from '../common/decorators/get-user-payload.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserRdo } from './rdo/user.rdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { accessToken } = await this.authService.register(dto);
    return accessToken;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const { accessToken } = await this.authService.login(dto);
    return accessToken;
  }

}
