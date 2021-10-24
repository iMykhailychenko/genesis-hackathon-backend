import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SearchPost } from '../../shared/decorators/search-post.decorator';
import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { Pagination } from '../../shared/interfaces/interface';

import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { PostEntity } from './entities/posts.entity';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    @ApiOperation({ summary: 'Search posts' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    async findAll(@User('id') userId: number, @SearchPost() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        if (userId) {
            return await this.postsService.addFavoriteFieldToPostsList(userId, await this.postsService.findAll(searchFilters));
        }

        return await this.postsService.findAll(searchFilters);
    }

    @Get('users/:userId')
    @ApiOperation({ summary: 'Search posts for user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    async findAllForUser(
        @User('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @SearchPost() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        if (userId) {
            return await this.postsService.addFavoriteFieldToPostsList(
                currentUserId,
                await this.postsService.findAllForUser(userId, searchFilters),
            );
        }

        return await this.postsService.findAllForUser(userId, searchFilters);
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Single post' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    async findById(@User('id') userId: number, @Param('postId', ParseIntPipe) postId: number): Promise<PostEntity> {
        if (userId) {
            return await this.postsService.addFavoriteFieldToSinglePosts(userId, await this.postsService.findById(postId));
        }

        return await this.postsService.findById(postId);
    }

    @Post('')
    @ApiOperation({ summary: 'Create post' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async createPost(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) createPostDto: CreatePostDto,
    ): Promise<PostEntity> {
        return await this.postsService.createPost(userId, createPostDto);
    }

    @Put(':postId')
    @ApiOperation({ summary: 'Update post' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async updatePost(
        @User('id') userId: number,
        @Param('postId', ParseIntPipe) postId: number,
        @Body(new ValidationPipe({ transform: true })) updatePostDto: CreatePostDto,
    ): Promise<PostEntity> {
        return await this.postsService.updatePost(userId, postId, updatePostDto);
    }
}
