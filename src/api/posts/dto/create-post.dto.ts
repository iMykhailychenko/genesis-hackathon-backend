import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

import { DISTRICT_FILTERS, PRICE_FILTERS, RESTAURANT_TYPE_FILTERS } from '../posts.interface';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;

    @IsBoolean()
    pets: boolean;

    @IsString()
    @IsOptional()
    image: string;

    @IsArray()
    @IsNotEmpty()
    @IsEnum(PRICE_FILTERS, { each: true })
    price: PRICE_FILTERS[];

    @IsArray()
    @IsNotEmpty()
    @IsEnum(DISTRICT_FILTERS, { each: true })
    district: DISTRICT_FILTERS[];

    @IsArray()
    @IsOptional()
    @IsEnum(RESTAURANT_TYPE_FILTERS, { each: true })
    restaurantType: RESTAURANT_TYPE_FILTERS[];
}
