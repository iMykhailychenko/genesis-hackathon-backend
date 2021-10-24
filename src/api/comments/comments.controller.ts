import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { Pagination } from '../../shared/interfaces/interface';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsEntity } from './entities/comments.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Get(':postId')
    @ApiOperation({ summary: 'Get comments for post' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    async findAllComments(
        @Param('postId', ParseIntPipe) postId: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('page', ParseIntPipe) page: number,
    ): Promise<Pagination<CommentsEntity>> {
        return await this.commentService.findAllComments(postId, limit, page);
    }

    @Post(':postId')
    @ApiOperation({ summary: 'Create comment' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Create comment' })
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createComments(
        @Body() createCommentDto: CreateCommentDto,
        @Param('postId', ParseIntPipe) postId: number,
        @User('id') userId: number,
    ): Promise<CommentsEntity> {
        return await this.commentService.createComment(createCommentDto, postId, userId);
    }

    @Put(':postId/:commentId')
    @ApiOperation({ summary: 'Update comment' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Update comment' })
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async updateComments(
        @Body('text') createCommentDto: CreateCommentDto,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) commentId: number,
        @User('id') userId: number,
    ): Promise<CommentsEntity> {
        return await this.commentService.updateComment(createCommentDto, postId, commentId, userId);
    }
}
