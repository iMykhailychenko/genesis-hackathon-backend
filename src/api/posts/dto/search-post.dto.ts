import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { DISTRICT_FILTERS, PRICE_FILTERS, RESTAURANT_TYPE_FILTERS } from '../posts.interface';

export class SearchPostDto {
    @IsString()
    @IsOptional()
    query: string;

    @IsBoolean()
    @IsOptional()
    pets: boolean;

    @IsArray()
    @IsOptional()
    @IsEnum(DISTRICT_FILTERS, { each: true })
    district: DISTRICT_FILTERS[];

    @IsArray()
    @IsOptional()
    @IsEnum(PRICE_FILTERS, { each: true })
    price: PRICE_FILTERS[];

    @IsArray()
    @IsOptional()
    @IsEnum(RESTAURANT_TYPE_FILTERS, { each: true })
    restaurantType: RESTAURANT_TYPE_FILTERS[];

    @IsInt()
    @IsOptional()
    @Min(0)
    page: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    limit: number;
}
