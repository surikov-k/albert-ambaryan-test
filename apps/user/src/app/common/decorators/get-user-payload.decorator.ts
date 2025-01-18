import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserPayload = createParamDecorator((data: undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return {
    id: request.user['sub'],
    email: request.user['email'],
  }
})
