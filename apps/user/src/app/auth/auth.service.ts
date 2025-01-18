import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthError } from './auth.constants';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async register(dto: RegisterDto) {
    const { email, password } = dto;
    const userData = { email, passwordHash: "" };

    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new Error(AuthError.ALREADY_EXISTS);
    }
    const userEntity = await new UserEntity(userData).setPassword(password)

    return this.userRepository.create(userEntity);
  }

  public async login(dto: LoginDto) {
    return dto;
  }
}
