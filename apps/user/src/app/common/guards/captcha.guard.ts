import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';

interface CustomSession extends ExpressSession {
  captcha: string;
}

@Injectable()
export class CaptchaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const bodyCaptcha = request.body.captcha;

    const sessionCaptcha = (request.session as CustomSession).captcha;

    if (bodyCaptcha !== sessionCaptcha) {
      throw new UnauthorizedException(
        'Verification code is incorrect, try again',
      );
    }

    return true;
  }
}
