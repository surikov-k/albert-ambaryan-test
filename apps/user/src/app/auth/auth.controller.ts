import { JwtPayload } from '@albert-ambaryan/types';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { prepareDto } from '@albert-ambaryan/helpers';
import { GetUserPayload } from '../common/decorators';
import { JwtAuthGuard, CaptchaGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { UserRdo } from './rdo/user.rdo';
import { Session as ExpressSession } from 'express-session';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(CaptchaGuard)
  async register(@Session() session: ExpressSession, @Body() dto: RegisterDto) {
    const { accessToken } = await this.authService.register(dto);
    return accessToken;
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(CaptchaGuard)
  async login(@Session() session: ExpressSession, @Body() dto: LoginDto) {
    const { accessToken } = await this.authService.login(dto);
    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async checkAuth(@GetUserPayload() payload: JwtPayload) {
    return prepareDto(UserRdo, payload);
  }
}
