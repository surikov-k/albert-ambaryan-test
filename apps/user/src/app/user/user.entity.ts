import { Entity } from '@albert-ambaryan/core';
import { User } from '@prisma/client';
import { SALT_ROUNDS } from './user.constants';
import { compare, genSalt, hash } from 'bcrypt';

export class UserEntity implements Partial<User>, Entity<string> {
  id?: string;
  email: string;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: Partial<User>) {
    this.fill(user);
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }

  toPlainObject() {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  fill(user: Partial<User>) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
