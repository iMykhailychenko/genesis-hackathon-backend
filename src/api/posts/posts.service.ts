import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';
import { FavoriteEntity } from '../favorite/entities/favorite.entity';
import { UserEntity, UserRole } from '../users/entities/users.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostEntity } from './entities/posts.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(FavoriteEntity) private readonly favoriteRepository: Repository<FavoriteEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    getSqlQueryForSearch(searchFilters: SearchPostDto): SelectQueryBuilder<PostEntity> {
        return this.postRepository
            .createQueryBuilder('posts')
            .leftJoinAndSelect('posts.user', 'users')
            .loadRelationCountAndMap('posts.favorite', 'posts.favorite')
            .where('((:district)::text[] IS NULL OR (posts.district)::text[] @> (:district)::text[])', {
                district: searchFilters.district,
            })
            .andWhere('((:price)::text[] IS NULL OR (posts.price)::text[] @> (:price)::text[])', {
                price: searchFilters.price,
            })
            .andWhere('((:restaurantType)::text[] IS NULL OR (posts.restaurantType)::text[] @> (:restaurantType)::text[])', {
                price: searchFilters.restaurantType,
            })
            .andWhere(
                '(((:query)::varchar IS NULL OR LOWER(posts.title) like LOWER(:query)) OR ((:query)::varchar IS NULL OR LOWER(posts.description) like LOWER(:query)))',
                { query: searchFilters.query ? `%${searchFilters.query}%` : null },
            );
    }

    formatPagination<T>(data: T[], total: number, searchPostDto: SearchPostDto): Pagination<T> {
        return {
            totalItems: total,
            totalPages: Math.ceil(total / searchPostDto.limit),
            currentPage: searchPostDto.page,
            data: data || [],
        };
    }

    async findAll(searchPostDto: SearchPostDto): Promise<Pagination<PostEntity>> {
        const sqlQuery = await this.getSqlQueryForSearch(searchPostDto);
        const total = await sqlQuery.getCount();

        const { page = 1, limit = 20 } = searchPostDto;
        const result = await sqlQuery
            .orderBy('posts.createdAt', 'DESC')
            .offset(limit * (page - 1))
            .limit(limit)
            .getMany();

        return this.formatPagination(result, total, searchPostDto);
    }

    async findAllForUser(userId: number, searchPostDto: SearchPostDto): Promise<Pagination<PostEntity>> {
        const sqlQuery = await this.getSqlQueryForSearch(searchPostDto);
        const total = await sqlQuery.andWhere('users.id = :userId', { userId }).getCount();

        const { page = 1, limit = 20 } = searchPostDto;
        const result = await sqlQuery
            .andWhere('users.id = :userId', { userId })
            .offset(limit * (page - 1))
            .limit(limit)
            .getMany();

        return this.formatPagination(result, total, searchPostDto);
    }

    async isPostInFavorite(postId: number, userId: number): Promise<boolean> {
        return !!(await this.favoriteRepository.findOne({ where: { post: postId, user: userId } }));
    }

    async addFavoriteFieldToPostsList(userId: number, postsList: Pagination<PostEntity>): Promise<Pagination<PostEntity>> {
        for await (const post of postsList.data) {
            post.isFavorite = await this.isPostInFavorite(post.id, userId);
        }
        return postsList;
    }

    async addFavoriteFieldToSinglePosts(userId: number, post: PostEntity): Promise<PostEntity> {
        post.isFavorite = await this.isPostInFavorite(post.id, userId);
        return post;
    }

    async findById(postId: number): Promise<PostEntity> {
        const post = await this.postRepository
            .createQueryBuilder('posts')
            .where({ id: postId })
            .leftJoinAndSelect('posts.user', 'users')
            .loadRelationCountAndMap('posts.favorite', 'posts.favorite')
            .getOne();

        if (!post) throw new HttpException('Post with this id do not exist', HttpStatus.NOT_FOUND);

        await this.postRepository
            .createQueryBuilder('posts')
            .update(PostEntity)
            .set({ views: () => 'views + 1' })
            .where({ id: postId })
            .execute();

        return { ...post, views: post.views + 1, isFavorite: false };
    }

    async createPost(userId: number, createPostDto: CreatePostDto): Promise<PostEntity> {
        const user = await this.userRepository.findOne(userId);
        if (user.role !== UserRole.ADMIN) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        const post = new PostEntity();
        Object.assign(post, createPostDto);
        post.user = user;
        return await this.postRepository.save(post);
    }

    async updatePost(userId: number, postId: number, updatePostDto: CreatePostDto): Promise<PostEntity> {
        const post = await this.postRepository.findOne(postId, { relations: ['user'] });
        if (post.user.id !== userId || post.user.role !== UserRole.ADMIN) {
            throw new HttpException('No permission', HttpStatus.FORBIDDEN);
        }

        Object.assign(post, updatePostDto);
        return await this.postRepository.save(post);
    }
}
