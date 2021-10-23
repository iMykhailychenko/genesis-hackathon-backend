import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import CreateUserDto from './dto/join.dto';
import { LoginDto } from './dto/login.dto';
import { LoginInterface } from './users.interface';
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

    @Post('login')
    @ApiOperation({ summary: 'Login (Authorization)' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
    async login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDto): Promise<LoginInterface> {
        return await this.userService.login(loginDto);
    }
}
