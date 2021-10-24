import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';
import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsEntity } from './entities/comments.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity) private readonly commentRepository: Repository<CommentsEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    ) {}

    async findAllComments(postId: number, limit = 10, page = 1): Promise<Pagination<CommentsEntity>> {
        const [result, total] = await this.commentRepository.findAndCount({
            relations: ['post', 'user'],
            where: {
                post: {
                    id: postId,
                },
            },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: limit * (page - 1),
        });

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit) - 1,
            currentPage: +page,
            data: result,
        };
    }

    async createComment(createCommentDto: CreateCommentDto, postId: number, userId: number): Promise<CommentsEntity> {
        const user = await this.userRepository.findOne(userId); // user already checked by middleware
        const post = await this.postRepository.findOne(postId);
        if (!post) throw new HttpException('Unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);

        const comment = new CommentsEntity();
        comment.text = createCommentDto.text;
        comment.image = createCommentDto.image;
        comment.user = user;
        comment.post = post;

        return await this.commentRepository.save(comment);
    }

    async updateComment(
        createCommentDto: CreateCommentDto,
        postId: number,
        commentId: number,
        userId: number,
    ): Promise<CommentsEntity> {
        const post = await this.postRepository.findOne(postId);
        if (!post) throw new HttpException('Unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);

        const comment = await this.commentRepository.findOne(commentId);
        if (!comment) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

        const user = await this.userRepository.findOne(userId, { relations: ['user'] }); // user already checked by middleware
        if (comment.user.id !== user.id) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        comment.text = createCommentDto.text;
        comment.image = createCommentDto.image;
        comment.updatedAt = new Date();

        return await this.commentRepository.save(comment);
    }
}
