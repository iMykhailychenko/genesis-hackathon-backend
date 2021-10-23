import { ConnectionOptions } from 'typeorm';

import { join } from 'path';

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    database: process.env.POSTGRES_DB || 'genesis-hackathon',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'genesis-hackathon',
    password: process.env.POSTGRES_PASSWORD || 'genesis-hackathon',
    logging: false,
    synchronize: false,
    migrationsRun: true,
    entities: [join('src', '**', '*.entity.{ts,js}')],
    migrations: [join('migrations', '**', '*.{ts,js}')],
    cli: {
        migrationsDir: 'migrations',
    },
};

export default dbConfig;
