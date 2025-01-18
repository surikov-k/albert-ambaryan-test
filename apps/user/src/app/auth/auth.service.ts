import { JwtPayload, Token } from '@albert-ambaryan/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthError } from './auth.constants';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(dto: RegisterDto) {
    const { email, password } = dto;
    const userData = { email, passwordHash: '' };

    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new Error(AuthError.ALREADY_EXISTS);
    }
    const userEntity = await new UserEntity(userData).setPassword(password);

    const user = await this.userRepository.create(userEntity);

    return await this.getToken(this.getJwtPayload(user));
  }

  public async verify(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AuthError.NOT_FOUND);
    }

    const entity = new UserEntity(user);

    if (!(await entity.validatePassword(password))) {
      throw new UnauthorizedException(AuthError.WRONG_CREDENTIALS);
    }

    return entity.toPlainObject();
  }

  public async login(dto: LoginDto) {
    const user = await this.verify(dto);

    return await this.getToken(this.getJwtPayload(user));
  }

  public getJwtPayload({ id, email }: User): JwtPayload {
    return {
      sub: id,
      email,
    };
  }

  public async getToken(payload: JwtPayload): Promise<Token> {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.accessTokenSecret'),
        expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
      }),
    ]);

    return {
      accessToken,
    };
  }
}
