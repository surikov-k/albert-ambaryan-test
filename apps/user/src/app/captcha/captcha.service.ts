import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

const NUMBER_OF_CHARS = 5;
const NUMBER_OF_NOISE_LINES = 2;
const BACKGROUND_COLOR = '#FFFFFF';

@Injectable()
export class CaptchaService {
  createCaptcha() {
    const captcha = svgCaptcha.create({
      size: NUMBER_OF_CHARS,
      noise: NUMBER_OF_NOISE_LINES,
      color: true,
      background: BACKGROUND_COLOR,
    });

    return {
      svg: captcha.data,
      text: captcha.text,
    };
  }
}
