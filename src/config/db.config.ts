import { FavoriteEntity } from 'src/api/favorite/entities/favorite.entity';
import { PostEntity } from 'src/api/posts/entities/posts.entity';
import { ConnectionOptions } from 'typeorm';

import { UserEntity } from '../api/users/entities/users.entity';

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: false,
    entities: [UserEntity, PostEntity, FavoriteEntity],
    ssl: Boolean(process.env.DB_SSL),
    synchronize: true,
};

export default dbConfig;
