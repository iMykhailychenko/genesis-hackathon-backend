import { Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';

import { FavoriteService } from './favorite.service';

@ApiTags('favorite')
@Controller('favorite')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}

    @Put(':postId')
    @ApiOperation({ summary: 'Toggle favorite' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Toggle favorite' })
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async toggleFavorite(@User('id') userId: number, @Param('postId', ParseIntPipe) postId: number): Promise<void> {
        await this.favoriteService.toggleFavorite(userId, postId);
    }
}
