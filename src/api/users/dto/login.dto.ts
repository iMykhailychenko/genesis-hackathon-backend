import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(6, 30)
    @IsNotEmpty()
    password: string;
}
