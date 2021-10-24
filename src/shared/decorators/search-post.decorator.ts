import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { DISTRICT_FILTERS, PRICE_FILTERS, RESTAURANT_TYPE_FILTERS } from 'src/api/posts/posts.interface';

import { SearchPostDto } from '../../api/posts/dto/search-post.dto';
import { AuthRequest } from '../../api/users/users.interface';

export const SearchPost = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthRequest>();

    const searchDto = new SearchPostDto();
    searchDto.page = +req.query.page || 1;
    searchDto.limit = +req.query.limit || 1;

    if (req.query.query) searchDto.query = req.query.query as string;

    if (req.query.district) searchDto.district = (req.query.district as string).split(',') as DISTRICT_FILTERS[];
    if (req.query.price) searchDto.price = (req.query.price as string).split(',') as PRICE_FILTERS[];
    if (req.query.restaurantType)
        searchDto.restaurantType = (req.query.restaurantType as string).split(',') as RESTAURANT_TYPE_FILTERS[];

    const errors = await validate(searchDto);
    if (errors.length) throw new HttpException(Object.values(errors[0].constraints)[0], HttpStatus.UNPROCESSABLE_ENTITY);

    return searchDto;
});
