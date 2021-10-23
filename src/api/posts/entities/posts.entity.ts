import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { UserEntity } from '../../users/entities/users.entity';
import { DISTRICT_FILTERS, POST_STATUS } from '../posts.interface';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: POST_STATUS })
    status: POST_STATUS;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'int' })
    residentsAmount: number;

    @Column({ type: 'varchar', default: null, nullable: true })
    children: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    pets: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    image: string;

    @Column('text', { array: true, nullable: true })
    districtFilters: DISTRICT_FILTERS[];

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    isFavorite: boolean;

    @OneToMany(() => FavoriteEntity, favorite => favorite.post)
    favorite: FavoriteEntity[];
}
