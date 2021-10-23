import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UserEntity } from '../../api/users/entities/users.entity';
import { UsersService } from '../../api/users/users.service';
import authConfig from '../../config/auth.config';

@Injectable()
export class JwtService {
    constructor(private readonly userService: UsersService) {}

    async verify(token?: string | null): Promise<UserEntity | null> {
        if (!token) return null;
        try {
            const formattedToken = token.replace('Bearer ', '');
            const decoded = jwt.verify(formattedToken, authConfig.accessKey);
            return await this.userService.findById(decoded.id);
        } catch (error) {
            return null;
        }
    }
}
