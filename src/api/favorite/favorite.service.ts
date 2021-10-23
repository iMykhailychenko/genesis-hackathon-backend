import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(@InjectRepository(FavoriteEntity) private readonly favoriteRepository: Repository<FavoriteEntity>) {}
}
