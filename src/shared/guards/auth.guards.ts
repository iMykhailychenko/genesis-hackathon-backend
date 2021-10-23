import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthRequest } from '../../api/users/users.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<AuthRequest>();
        if (request.user) return true;
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
}
