import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PostEntity } from '../../posts/entities/posts.entity';
import { UserEntity } from '../../users/entities/users.entity';

@Entity('comments')
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'varchar' })
    text: string;

    @ManyToOne(() => PostEntity, post => post.comments, { onDelete: 'CASCADE' })
    post: PostEntity;

    @ManyToOne(() => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
    user: UserEntity;
}
