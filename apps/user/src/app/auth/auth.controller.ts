import { Body, Controller, Post } from '@nestjs/common';
import { prepareDto } from '@albert-ambaryan/helpers';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { UserRdo } from './rdo/user.rdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return prepareDto(UserRdo, user);
  }
}
