import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { AuthRequest } from '../../api/users/users.interface';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        if (!req.get('Authorization')) {
            req.user = null;
        } else {
            req.user = await this.jwtService.verify(req.get('Authorization'));
        }

        next();
    }
}
