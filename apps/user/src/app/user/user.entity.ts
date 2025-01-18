import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.fill(user);
  }

  toObject() {
    return {
      ...this
    };
  }

  fill(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
