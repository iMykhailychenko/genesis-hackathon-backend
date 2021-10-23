import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import CreateUserDto from './dto/join.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Join (Authorization)' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User created' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async join(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }
}
