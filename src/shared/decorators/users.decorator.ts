import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthRequest } from '../../api/users/users.interface';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    if (!request.user) return null;
    if (data) return request.user[data];
    return request.user;
});
