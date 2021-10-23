import { Request } from 'express';

import { UserEntity } from './entities/users.entity';

export interface LoginInterface {
    accessToken: string;
}

export type AuthRequest = Request & { user?: UserEntity };
