import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './entities/posts.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private readonly postsRepository: Repository<PostEntity>) {}
}
