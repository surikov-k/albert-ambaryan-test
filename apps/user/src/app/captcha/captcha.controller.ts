import { Controller, Get, Session, Res, Post, Body, Req } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Response, Request } from 'express';
import { SessionData } from 'express-session';

interface CustomSession extends SessionData {
  captcha?: string;
}

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  getCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = this.captchaService.createCaptcha();
    (req.session as CustomSession).captcha = captcha.text;

    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
    });

    console.log(req.session);

    res.type('svg');
    res.send(captcha.svg);
  }

  @Post()
  validateCaptcha(@Session() session, @Body() body: { captcha: string }) {
    const isValid = body.captcha === session.captcha;
    session.captcha = null;
    return { isValid };
  }
}
