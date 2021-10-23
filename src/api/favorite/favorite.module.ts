import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';

import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteEntity])],
    controllers: [FavoriteController],
    providers: [FavoriteService, AuthGuard],
})
export class FavoriteModule {}
