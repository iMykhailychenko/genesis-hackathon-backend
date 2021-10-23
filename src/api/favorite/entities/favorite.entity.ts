import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PostEntity } from '../../posts/entities/posts.entity';
import { UserEntity } from '../../users/entities/users.entity';

@Entity('favorite')
export class FavoriteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PostEntity, post => post.favorite, { onDelete: 'CASCADE' })
    post: PostEntity;

    @ManyToOne(() => UserEntity, user => user.favorite, { onDelete: 'CASCADE' })
    user: UserEntity;
}
