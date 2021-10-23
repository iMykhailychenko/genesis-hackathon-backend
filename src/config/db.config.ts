import { FavoriteEntity } from 'src/api/favorite/entities/favorite.entity';
import { PostEntity } from 'src/api/posts/entities/posts.entity';
import { ConnectionOptions } from 'typeorm';

import { UserEntity } from '../api/users/entities/users.entity';

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'genesis-hackathon',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'genesis-hackathon',
    password: process.env.POSTGRES_PASSWORD || 'genesis-hackathon',
    logging: false,
    entities: [UserEntity, PostEntity, FavoriteEntity],
    ssl: Boolean(process.env.DB_SSL),
    synchronize: true,
};

export default dbConfig;
