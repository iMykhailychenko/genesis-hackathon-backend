import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommentsEntity } from '../../comments/entities/comments.entity';
import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { UserEntity } from '../../users/entities/users.entity';
import { DISTRICT_FILTERS, PRICE_FILTERS, RESTAURANT_TYPE_FILTERS } from '../posts.interface';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    image: string;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'boolean' })
    pets: boolean;

    @Column('text', { array: true, nullable: true })
    district: DISTRICT_FILTERS[];

    @Column('text', { array: true, nullable: true })
    price: PRICE_FILTERS[];

    @Column('text', { array: true, nullable: true })
    restaurantType: RESTAURANT_TYPE_FILTERS[];

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    isFavorite: boolean;

    @OneToMany(() => FavoriteEntity, favorite => favorite.post)
    favorite: FavoriteEntity[];

    @OneToMany(() => CommentsEntity, comment => comment.post)
    comments: CommentsEntity[];
}
