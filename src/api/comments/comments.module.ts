import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './entities/comments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CommentsEntity, PostEntity, UserEntity])],
    controllers: [CommentsController],
    providers: [CommentsService, AuthGuard],
})
export class CommentsModule {}
