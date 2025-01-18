import { CrudRepository } from '@albert-ambaryan/core';
import { PrismaClientService } from '@albert-ambaryan/models';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository
  implements CrudRepository<UserEntity, string, User>
{
  constructor(private readonly prisma: PrismaClientService) {}

  public async findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  public async create(item: UserEntity): Promise<User> {
    return this.prisma.user.create({
      data: { ...item.toPlainObject() },
    });
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...item.toPlainObject() },
    });
  }

  public async destroy(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
