import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';

import { CommentsEntity } from './entities/comments.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentsEntity) private readonly commentRepository: Repository<CommentsEntity>) {}
    async findAllComments(): Promise<Pagination<CommentsEntity>> {
        return 'ass' as any;
    }
}
