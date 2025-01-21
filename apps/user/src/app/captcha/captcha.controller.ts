import { Controller, Get, Session, Res, Post, Body } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  getCaptcha(@Session() session, @Res() res) {
    const captcha = this.captchaService.createCaptcha();
    session.captcha = captcha.text;
    res.type('svg');
    res.send(captcha.svg);
  }

  @Post('validate')
  validateCaptcha(@Session() session, @Body() body: { captcha: string }) {
    const isValid = body.captcha === session.captcha;
    session.captcha = null;
    return { isValid };
  }
}
