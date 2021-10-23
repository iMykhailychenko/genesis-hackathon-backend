import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { FavoriteEntity } from '../favorite/entities/favorite.entity';
import { UserEntity } from '../users/entities/users.entity';

import { PostEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, FavoriteEntity])],
    controllers: [PostsController],
    providers: [PostsService, AuthGuard],
})
export class PostsModule {}
