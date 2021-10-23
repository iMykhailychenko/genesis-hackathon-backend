import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteModule } from './api/favorite/favorite.module';
import { PostsModule } from './api/posts/posts.module';
import { UsersModule } from './api/users/users.module';
import dbConfig from './config/db.config';
import { JwtModule } from './shared/jwt/jwt.module';
import { AuthMiddleware } from './shared/middleware/auth.middleware';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), FavoriteModule, PostsModule, UsersModule, JwtModule],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
