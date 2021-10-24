import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';

import CreateUserDto from './dto/join.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entities/users.entity';
import { LoginInterface } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Join' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User created' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async join(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    async login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDto): Promise<LoginInterface> {
        return await this.userService.login(loginDto);
    }

    @Get('profile')
    @ApiOperation({ summary: 'User info from token' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() user: UserEntity): Promise<UserEntity> {
        return user;
    }
}
