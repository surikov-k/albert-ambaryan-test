import { User } from '@prisma/client';

export type JwtPayload = Pick<User, "email"> & { sub:string}
