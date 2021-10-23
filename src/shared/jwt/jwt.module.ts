import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../api/users/entities/users.entity';
import { UsersService } from '../../api/users/users.service';

import { JwtService } from './jwt.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [JwtService, UsersService],
    exports: [JwtService],
})
export class JwtModule {}
